"use client";
import { useEffect, useRef } from "react";
import { FaceLandmarker, FilesetResolver, DrawingUtils } from "@mediapipe/tasks-vision";

interface FocusDetectorProps {
  onStatusChange: (status: string) => void;
}

const FocusDetector = ({ onStatusChange }: FocusDetectorProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blinkStartTimeRef = useRef<number | null>(null);
  const lastStatusRef = useRef("Enfocado");
  const blinkBufferRef = useRef<number[]>([]);

  useEffect(() => {
    let faceLandmarker: FaceLandmarker;
    let animationFrameId: number;

    const initialize = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
        );
        faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: { 
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
            delegate: "GPU" 
          },
          outputFaceBlendshapes: true,
          runningMode: "VIDEO",
        });
        startCamera();
      } catch (err) { 
        console.error("Error MediaPipe:", err); 
      }
    };

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => predict();
        }
      } catch (err) {
        console.error("Error al acceder a la cámara:", err);
      }
    };

    const predict = () => {
      // Validacion inicial
      if (!canvasRef.current || !videoRef.current) return;
      
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;
      
      const draw = new DrawingUtils(ctx);

      const render = () => {
        // Validacion dentro del bucle de animación
        if (!faceLandmarker || !videoRef.current || !canvasRef.current) return;
        
        const results = faceLandmarker.detectForVideo(videoRef.current, performance.now());

        if (results.faceBlendshapes?.length > 0 && results.faceLandmarks?.length > 0) {
          const shapes = results.faceBlendshapes[0].categories;
          const landmarks = results.faceLandmarks[0];
          const getScore = (name: string) => shapes.find(s => s.categoryName === name)?.score || 0;

          // --- AJUSTES DE CALIBRACION ---
          const UMBRAL_CIERRE = 0.55;
          const UMBRAL_GIRO_LATERAL = 0.80;
          const UMBRAL_MIRADA_ABAJO = 0.50;
          const UMBRAL_CABEZA_ABAJO = 0.09;

          const currentBlink = (getScore("eyeBlinkLeft") + getScore("eyeBlinkRight")) / 2;
          blinkBufferRef.current.push(currentBlink);
          if (blinkBufferRef.current.length > 5) blinkBufferRef.current.shift();
          const avgBlink = blinkBufferRef.current.reduce((a, b) => a + b, 0) / blinkBufferRef.current.length;

          const narizY = landmarks[1].y;
          const barbillaY = landmarks[152].y;
          const distanciaVertical = barbillaY - narizY;
          
          let currentStatus = "Enfocado";

          if (avgBlink > UMBRAL_CIERRE) {
            if (!blinkStartTimeRef.current) blinkStartTimeRef.current = performance.now();
            if (performance.now() - blinkStartTimeRef.current > 1200) {
              currentStatus = "Distraído (Cansancio)";
            } else {
              currentStatus = lastStatusRef.current;
            }
          } else {
            blinkStartTimeRef.current = null;
            const isLookingAway = 
              getScore("eyeLookOutLeft") > UMBRAL_GIRO_LATERAL || 
              getScore("eyeLookOutRight") > UMBRAL_GIRO_LATERAL ||
              getScore("eyeLookDownLeft") > UMBRAL_MIRADA_ABAJO ||
              distanciaVertical < UMBRAL_CABEZA_ABAJO;

            if (isLookingAway) currentStatus = "Distraído (Fuera de pantalla)";
          }

          if (currentStatus !== lastStatusRef.current) {
            lastStatusRef.current = currentStatus;
            onStatusChange(currentStatus);
          }
        }

        // Limpieza segura del canvas
        if (canvasRef.current) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }

        //MALLAS
        if (results.faceLandmarks) {
          results.faceLandmarks.forEach(l => {
            draw.drawConnectors(l, FaceLandmarker.FACE_LANDMARKS_TESSELATION, { color: "#C0C0C040", lineWidth: 1 });
            draw.drawConnectors(l, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, { color: "#00FFFF", lineWidth: 2 });
            draw.drawConnectors(l, FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, { color: "#00FFFF", lineWidth: 2 });
          });
        }
        animationFrameId = requestAnimationFrame(render);
      };
      render();
    };

    initialize();
    
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      }
    };
  }, [onStatusChange]);

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "640px", margin: "auto" }}>
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        style={{ width: "100%", borderRadius: "15px", transform: "scaleX(-1)", backgroundColor: "#000" }} 
      />
      <canvas 
        ref={canvasRef} 
        width="640" 
        height="480" 
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", transform: "scaleX(-1)", pointerEvents: "none" }} 
      />
    </div>
  );
};

export default FocusDetector;