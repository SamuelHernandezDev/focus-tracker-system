"use client";
import { useEffect, useRef, memo } from "react";
import { FaceLandmarker, FilesetResolver, DrawingUtils } from "@mediapipe/tasks-vision";

interface DetectorProps {
  onStatusChange?: (status: string) => void;
}

const Detector = memo(({ onStatusChange }: DetectorProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blinkStartTimeRef = useRef<number | null>(null);
  const lastStatusRef = useRef<string>("Enfocado");
  const blinkBufferRef = useRef<number[]>([]);

  useEffect(() => {
    let faceLandmarker: FaceLandmarker;
    let animationFrameId: number;
    let isMounted = true;

    const initialize = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
        );
        faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
            delegate: "GPU",
          },
          outputFaceBlendshapes: true,
          runningMode: "VIDEO",
        });
        if (isMounted) startCamera();
      } catch (err) {
        console.error("Error en inicialización:", err);
      }
    };

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current && isMounted) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => predict();
        }
      } catch (err) {
        console.error("Error al iniciar cámara:", err);
      }
    };

    const predict = () => {
      const render = () => {
        if (!faceLandmarker || !videoRef.current || !canvasRef.current || !isMounted) return;
        
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
        const draw = new DrawingUtils(ctx);

        const results = faceLandmarker.detectForVideo(videoRef.current, performance.now());

        if (results.faceBlendshapes?.length > 0 && results.faceLandmarks?.length > 0) {
          const shapes = results.faceBlendshapes[0].categories;
          const landmarks = results.faceLandmarks[0];
          
          const getScore = (name: string) => 
            shapes.find((s) => s.categoryName === name)?.score || 0;

          // --- AJUSTES DE CALIBRACION ---
          const UMBRAL_CIERRE = 0.55;
          const UMBRAL_GIRO_LATERAL = 0.80;
          const UMBRAL_MIRADA_ABAJO = 0.50;
          const UMBRAL_CABEZA_ABAJO = 0.09;

          // --- LOGICA DE SUAVIZADO ---
          const currentBlink = (getScore("eyeBlinkLeft") + getScore("eyeBlinkRight")) / 2;
          blinkBufferRef.current.push(currentBlink);
          if (blinkBufferRef.current.length > 15) blinkBufferRef.current.shift();
          
          const avgBlink = 
            blinkBufferRef.current.reduce((a, b) => a + b, 0) / blinkBufferRef.current.length;

          const narizY = landmarks[1].y;
          const barbillaY = landmarks[152].y;
          const distanciaVertical = barbillaY - narizY;
          
          let currentStatus = "Enfocado";

          if (avgBlink > UMBRAL_CIERRE) {
            if (!blinkStartTimeRef.current) blinkStartTimeRef.current = performance.now();
            if (performance.now() - blinkStartTimeRef.current > 2000) {
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

          // Solo notificamos si el estado cambia
          if (onStatusChange && currentStatus !== lastStatusRef.current) {
            lastStatusRef.current = currentStatus;
            onStatusChange(currentStatus);
          }
        }

        // --- DIBUJO ---
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
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
      isMounted = false;
      cancelAnimationFrame(animationFrameId);
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, []); // Array vacío para que la cámara no se reinicie

  return (
    <div style={{ position: "relative", width: "640px", height: "480px", margin: "auto", overflow: "hidden", borderRadius: "15px" }}>
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        muted
        style={{ position: "absolute", width: "100%", height: "100%", transform: "scaleX(-1)", objectFit: "cover", backgroundColor: "#000", zIndex: 1 }} 
      />
      <canvas 
        ref={canvasRef} 
        width="640" 
        height="480" 
        style={{ position: "absolute", top: 0, left: 0, transform: "scaleX(-1)", pointerEvents: "none", zIndex: 2 }} 
      />
    </div>
  );
});

Detector.displayName = "Detector";
export default Detector;