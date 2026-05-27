//frontend\modules\focus\components\cameraPreview\CameraPreviewHeader.tsx
'use client';

import {
  Camera,
  Play,
  Square,
  Activity,
  ChevronDown,
  Check,
} from 'lucide-react';

import { useRef, useState } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';

type Device = {
  deviceId: string;

  label: string;
};

type Props = {
  devices: Device[];

  selectedDeviceId: string;

  onChangeDevice: (id: string) => void;

  onStart: () => void;

  onStop: () => void;

  loading: boolean;

  streaming: boolean;
};

export function CameraPreviewHeader({
  devices,
  selectedDeviceId,
  onChangeDevice,
  onStart,
  onStop,
  loading,
  streaming,
}: Props) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false), open);

  const selectedDevice = devices.find((d) => d.deviceId === selectedDeviceId);
  return (
    <div
      className="
        flex items-center
        justify-between

        gap-4
      "
    >
      {/* LEFT */}

      <div
        className="
          flex items-center
          gap-3
        "
      >
        {/* ICON */}

        <div
          className="
            relative

            w-10 h-10

            rounded-2xl

            bg-gradient-to-br
            from-violet-500
            to-indigo-500

            flex items-center
            justify-center

            shadow-lg
            shadow-violet-500/20

            shrink-0
          "
        >
          {/* GLOW */}

          <div
            className="
              absolute inset-0

              rounded-2xl

              bg-violet-400/20

              blur-xl
            "
          />

          <Camera
            size={20}
            className="
              relative z-10
              text-white
            "
          />
        </div>

        {/* TEXT */}

        <div>
          <div
            className="
              flex items-center
              gap-2
            "
          >
            <h2
              className="
                text-[15px]
                font-semibold
                text-gray-900
              "
            >
              AI Camera Monitor
            </h2>

            {streaming && (
              <div
                className="
                  px-2 py-1

                  rounded-full

                  bg-emerald-100
                  text-emerald-700

                  text-[11px]
                  font-medium

                  flex items-center
                  gap-1
                "
              >
                <Activity size={10} />
                LIVE
              </div>
            )}
          </div>

          <p
            className="
              mt-1

              text-xs
              text-gray-500
            "
          >
            Real-time face and attention tracking
          </p>
        </div>
      </div>

      {/* RIGHT */}

      <div
        className="
          flex items-center
          gap-2
        "
      >
        {/* DEVICE */}

        <div
          ref={ref}
          className="
    relative
  "
        >
          {/* BUTTON */}

          <button
            onClick={() => setOpen((prev) => !prev)}
            className="
      group

      h-11

      min-w-[190px]
      max-w-[240px]

      flex items-center
      justify-between

      gap-3

      px-4

      rounded-2xl

      border border-white/50

      bg-white/80
      backdrop-blur-xl

      shadow-sm

      hover:bg-white
      hover:shadow-md
      hover:-translate-y-[1px]

      transition-all
      duration-200
    "
          >
            <span
              className="
        truncate

        text-xs
        font-medium
        text-gray-700
      "
            >
              {selectedDevice?.label || 'Select Camera'}
            </span>

            <ChevronDown
              size={14}
              className={`
        text-gray-400

        transition-transform
        duration-200

        ${open ? 'rotate-180' : ''}
      `}
            />
          </button>

          {/* DROPDOWN */}

          {open && (
            <div
              className="
        absolute
        right-0

        mt-3

        z-50

        w-full

        overflow-hidden

        rounded-3xl

        border border-white/40

        bg-white/90
        backdrop-blur-2xl

        shadow-2xl
        shadow-black/10

        p-1.5
      "
            >
              {/* OPTIONS */}

              <div
                className="
          space-y-1
        "
              >
                {devices.map((device) => {
                  const active = device.deviceId === selectedDeviceId;

                  return (
                    <button
                      key={device.deviceId}
                      onClick={() => {
                        onChangeDevice(device.deviceId);

                        setOpen(false);
                      }}
                      className={`
                w-full

                flex items-center
                justify-between

                gap-3

                px-3 py-2

                rounded-2xl

                text-left

                transition-all
                duration-200

                ${
                  active
                    ? `
                      bg-gradient-to-r
                      from-violet-500
                      to-indigo-500

                      text-white

                      shadow-lg
                      shadow-violet-500/20
                    `
                    : `
                      text-gray-700

                      hover:bg-gray-50
                    `
                }
              `}
                    >
                      <span
                        className="
                  truncate

                  text-xs
                  font-medium
                "
                      >
                        {device.label || 'Camera Device'}
                      </span>

                      {active && <Check size={14} />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* START */}

        {!streaming && (
          <button
            onClick={onStart}
            disabled={loading}
            className="
              h-11

              px-4

              rounded-2xl

              flex items-center
              gap-2

              bg-gradient-to-r
              from-indigo-500
              to-violet-500

              text-white

              shadow-lg
              shadow-indigo-500/20

              hover:-translate-y-[1px]

              transition-all
            "
          >
            <Play size={15} />

            <span
              className="
                text-xs
                font-medium
              "
            >
              Start
            </span>
          </button>
        )}

        {/* STOP */}

        {streaming && (
          <button
            onClick={onStop}
            className="
              h-11

              px-4

              rounded-2xl

              flex items-center
              gap-2

              bg-gradient-to-r
              from-red-500
              to-rose-500

              text-white

              shadow-lg
              shadow-red-500/20

              hover:-translate-y-[1px]

              transition-all
            "
          >
            <Square size={15} />

            <span
              className="
                text-xs
                font-medium
              "
            >
              Stop
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
