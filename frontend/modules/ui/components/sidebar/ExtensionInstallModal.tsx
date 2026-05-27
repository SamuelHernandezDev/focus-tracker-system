//frontend/modules/ui/components/sidebar/ExtensionInstallModal.tsx
'use client';

import {
  Puzzle,
  Download,
  Globe,
  FolderOpen,
  ShieldCheck,
  CheckCircle2,
  X,
} from 'lucide-react';

import { createPortal } from 'react-dom';

type Props = {
  open: boolean;

  onClose: () => void;
};

const steps = [
  {
    id: 1,

    title: 'Download Extension',

    description: 'Download the Focus Tracker browser extension package.',

    icon: Download,

    color: 'from-indigo-500 to-violet-500',
  },

  {
    id: 2,

    title: 'Open Extensions Page',

    description: 'Go to your browser extensions management page.',

    icon: Globe,

    color: 'from-sky-500 to-cyan-500',
  },

  {
    id: 3,

    title: 'Enable Developer Mode',

    description: 'Activate developer mode to allow local extensions.',

    icon: ShieldCheck,

    color: 'from-emerald-500 to-green-500',
  },

  {
    id: 4,

    title: 'Load Extension Folder',

    description: 'Select the extracted Focus Tracker extension folder.',

    icon: FolderOpen,

    color: 'from-amber-500 to-orange-500',
  },
];

export default function ExtensionInstallModal({ open, onClose }: Props) {
  if (!open) return null;

  return createPortal(
    <div
      className="
        fixed inset-0

        z-[99999]

        flex items-center
        justify-center
      "
    >
      {/* OVERLAY */}

      <div
        onClick={onClose}
        className="
          absolute inset-0

          bg-black/50

          backdrop-blur-md
        "
      />

      {/* MODAL */}

      <div
        className="
          relative

          w-[1050px]
          max-w-[94vw]

          h-[760px]
          max-h-[92vh]

          overflow-hidden

          rounded-[40px]

          border border-white/20

          bg-white/80

          backdrop-blur-2xl

          shadow-[0_40px_120px_rgba(0,0,0,0.18)]

          animate-in
          fade-in
          zoom-in-95
          duration-300
        "
      >
        {/* BACKGROUND GLOW */}

        <div
          className="
            absolute
            top-0
            right-0

            w-[420px]
            h-[420px]

            rounded-full

            bg-indigo-500/10

            blur-3xl
          "
        />

        {/* CONTENT */}

        <div
          className="
            relative z-10

            h-full

            grid

            xl:grid-cols-[0.95fr_1.05fr]
          "
        >
          {/* LEFT SIDE */}

          <div
            className="
              relative

              overflow-hidden

              border-r border-white/20

              bg-gradient-to-br
              from-[#0b1220]
              via-[#101827]
              to-[#111827]

              p-10

              flex flex-col
              justify-between
            "
          >
            {/* LARGE GLOW */}

            <div
              className="
                absolute
                top-[-100px]
                right-[-100px]

                w-[320px]
                h-[320px]

                rounded-full

                bg-indigo-500/20

                blur-3xl
              "
            />

            {/* HERO */}

            <div
              className="
                relative z-10
              "
            >
              {/* ICON */}

              <div
                className="
                  w-20
                  h-20

                  rounded-[28px]

                  bg-gradient-to-br
                  from-indigo-500
                  to-violet-500

                  flex items-center
                  justify-center

                  shadow-2xl
                  shadow-indigo-500/20
                "
              >
                <Puzzle
                  size={34}
                  className="
                    text-white
                  "
                />
              </div>

              {/* TITLE */}

              <h2
                className="
                  mt-8

                  text-4xl
                  font-semibold

                  tracking-tight

                  text-white
                "
              >
                Focus Extension
              </h2>

              <p
                className="
                  mt-4

                  max-w-md

                  text-sm
                  leading-relaxed

                  text-slate-300
                "
              >
                Install the browser extension to enable website monitoring,
                distraction tracking and complete productivity analytics inside
                Focus Tracker.
              </p>

              {/* STATUS */}

              <div
                className="
                  mt-8

                  inline-flex
                  items-center
                  gap-2

                  rounded-full

                  border border-emerald-400/20

                  bg-emerald-500/10

                  px-4
                  py-2
                "
              >
                <CheckCircle2
                  size={16}
                  className="
                    text-emerald-400
                  "
                />

                <span
                  className="
                    text-sm
                    font-medium

                    text-emerald-300
                  "
                >
                  Extension ready for installation
                </span>
              </div>
            </div>

            {/* MOCK VISUAL */}

            <div
              className="
                relative z-10

                mt-10
              "
            >
              <div
                className="
                  relative

                  overflow-hidden

                  rounded-[32px]

                  border border-white/10

                  bg-white/[0.04]

                  backdrop-blur-xl

                  p-6
                "
              >
                {/* TOP BAR */}

                <div
                  className="
                    flex items-center
                    gap-2
                  "
                >
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>

                {/* CONTENT */}

                <div
                  className="
                    mt-8

                    flex flex-col
                    items-center
                    justify-center
                  "
                >
                  <div
                    className="
                      w-24
                      h-24

                      rounded-[30px]

                      bg-gradient-to-br
                      from-indigo-500
                      to-violet-500

                      flex items-center
                      justify-center

                      shadow-2xl
                      shadow-indigo-500/20
                    "
                  >
                    <Puzzle
                      size={40}
                      className="
                        text-white
                      "
                    />
                  </div>

                  <p
                    className="
                      mt-6

                      text-lg
                      font-medium

                      text-white
                    "
                  >
                    Focus Tracker Extension
                  </p>

                  <div
                    className="
                      mt-3

                      inline-flex
                      items-center
                      gap-2

                      rounded-full

                      bg-emerald-500/10

                      px-4
                      py-2
                    "
                  >
                    <div
                      className="
                        w-2
                        h-2

                        rounded-full

                        bg-emerald-400

                        animate-pulse
                      "
                    />

                    <span
                      className="
                        text-xs
                        font-medium

                        text-emerald-300
                      "
                    >
                      Connected to Focus Tracker
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}

          <div
            className="
              relative

              h-full

              flex flex-col
            "
          >
            {/* HEADER */}

            <div
              className="
                flex items-start
                justify-between

                px-8
                pt-8
                pb-6

                border-b border-white/30
              "
            >
              <div>
                <h3
                  className="
                    text-2xl
                    font-semibold

                    text-gray-900
                  "
                >
                  Installation Guide
                </h3>

                <p
                  className="
                    mt-2

                    text-sm
                    text-gray-500
                  "
                >
                  Follow these steps to connect your browser with Focus Tracker.
                </p>
              </div>

              {/* CLOSE */}

              <button
                onClick={onClose}
                className="
                  w-11
                  h-11

                  rounded-2xl

                  border border-white/40

                  bg-white/70

                  flex items-center
                  justify-center

                  text-gray-500

                  hover:bg-white
                  hover:text-gray-900

                  transition-all
                "
              >
                <X size={18} />
              </button>
            </div>

            {/* STEPS */}

            <div
              className="
                flex-1

                overflow-y-auto

                p-8

                space-y-5
              "
            >
              {steps.map((step) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.id}
                    className="
                      group

                      relative

                      overflow-hidden

                      rounded-[28px]

                      border border-white/40

                      bg-white/70

                      backdrop-blur-xl

                      p-5

                      transition-all
                      duration-300

                      hover:-translate-y-[1px]
                      hover:bg-white
                      hover:shadow-lg
                      hover:shadow-black/[0.04]
                    "
                  >
                    {/* HOVER GLOW */}

                    <div
                      className="
                        absolute inset-0

                        opacity-0
                        group-hover:opacity-100

                        bg-gradient-to-r
                        from-indigo-500/[0.03]
                        to-transparent

                        transition
                      "
                    />

                    {/* CONTENT */}

                    <div
                      className="
                        relative z-10

                        flex items-start
                        gap-5
                      "
                    >
                      {/* STEP NUMBER */}

                      <div
                        className="
                          shrink-0

                          w-10
                          h-10

                          rounded-2xl

                          bg-slate-100

                          flex items-center
                          justify-center

                          text-sm
                          font-semibold

                          text-gray-700
                        "
                      >
                        {step.id}
                      </div>

                      {/* TEXT */}

                      <div
                        className="
                          flex-1
                        "
                      >
                        <div
                          className="
                            flex items-center
                            gap-3
                          "
                        >
                          {/* ICON */}

                          <div
                            className={`
                              w-11
                              h-11

                              rounded-2xl

                              bg-gradient-to-br

                              flex items-center
                              justify-center

                              shadow-lg

                              ${step.color}
                            `}
                          >
                            <Icon
                              size={18}
                              className="
                                text-white
                              "
                            />
                          </div>

                          <div>
                            <h4
                              className="
                                text-sm
                                font-semibold

                                text-gray-900
                              "
                            >
                              {step.title}
                            </h4>

                            <p
                              className="
                                mt-1

                                text-xs
                                leading-relaxed

                                text-gray-500
                              "
                            >
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* FOOTER */}

            <div
              className="
                flex items-center
                justify-between

                px-8
                py-6

                border-t border-white/30
              "
            >
              <div>
                <p
                  className="
                    text-sm
                    font-medium

                    text-gray-800
                  "
                >
                  Extension Package
                </p>

                <p
                  className="
                    mt-1

                    text-xs
                    text-gray-500
                  "
                >
                  Download and extract the extension ZIP
                </p>
              </div>

              {/* DOWNLOAD */}

              <button
                className="
                  h-12

                  px-6

                  rounded-2xl

                  bg-gradient-to-r
                  from-indigo-500
                  to-violet-500

                  flex items-center
                  gap-2

                  text-sm
                  font-medium

                  text-white

                  shadow-xl
                  shadow-indigo-500/20

                  hover:scale-[1.02]

                  transition-all
                "
              >
                <a
                  href="/downloads/focus-tracker-companion-v1.zip"
                  download
                  className="
    h-12

    px-6

    rounded-2xl

    bg-gradient-to-r
    from-indigo-500
    to-violet-500

    flex items-center
    gap-2

    text-sm
    font-medium

    text-white

    shadow-xl
    shadow-indigo-500/20

    hover:scale-[1.02]

    transition-all
  "
                >
                  <Download size={16} />
                  Download ZIP
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,

    document.body
  );
}
