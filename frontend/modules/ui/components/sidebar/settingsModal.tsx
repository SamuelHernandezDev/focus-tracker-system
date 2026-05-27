//frontend/modules/ui/components/sidebar/settingsModal.tsx
'use client';

import { Settings, Bell, Brain, Monitor, Shield, X } from 'lucide-react';

type Props = {
  open: boolean;

  onClose: () => void;
};

export default function SettingsModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0

        z-50

        flex items-center
        justify-center
      "
    >
      {/* OVERLAY */}

      <div
        onClick={onClose}
        className="
          absolute inset-0

          bg-black/40

          backdrop-blur-md
        "
      />

      {/* MODAL */}

      <div
        className="
          relative

          w-[760px]
          max-w-[92vw]

          overflow-hidden

          rounded-[36px]

          border border-white/20

          bg-white/80

          backdrop-blur-2xl

          shadow-[0_30px_120px_rgba(0,0,0,0.18)]
        "
      >
        {/* GLOW */}

        <div
          className="
            absolute
            top-0
            right-0

            w-72
            h-72

            rounded-full

            bg-indigo-500/10

            blur-3xl
          "
        />

        {/* HEADER */}

        <div
          className="
            relative z-10

            flex items-start
            justify-between

            px-8
            pt-7
            pb-5

            border-b border-white/30
          "
        >
          {/* LEFT */}

          <div
            className="
              flex items-start
              gap-4
            "
          >
            {/* ICON */}

            <div
              className="
                relative

                w-14
                h-14

                rounded-2xl

                bg-gradient-to-br
                from-indigo-500
                to-violet-500

                flex items-center
                justify-center

                shadow-lg
                shadow-indigo-500/20
              "
            >
              <Settings
                size={22}
                className="
                  text-white
                "
              />
            </div>

            {/* TEXT */}

            <div>
              <h2
                className="
                  text-2xl
                  font-semibold

                  tracking-tight

                  text-gray-900
                "
              >
                Settings
              </h2>

              <p
                className="
                  mt-1

                  text-sm
                  text-gray-500
                "
              >
                Configure your Focus Tracker experience
              </p>
            </div>
          </div>

          {/* CLOSE */}

          <button
            onClick={onClose}
            className="
              w-11
              h-11

              rounded-2xl

              bg-white/70

              border border-white/40

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

        {/* CONTENT */}

        <div
          className="
            relative z-10

            grid grid-cols-2

            gap-5

            p-8
          "
        >
          {/* CARD */}

          {[
            {
              title: 'Focus Tracking',
              desc: 'Camera and attention monitoring',
              icon: Brain,
              color: 'from-indigo-500 to-violet-500',
            },

            {
              title: 'Notifications',
              desc: 'Alerts and productivity reminders',
              icon: Bell,
              color: 'from-amber-500 to-orange-500',
            },

            {
              title: 'Privacy',
              desc: 'Tracking permissions and controls',
              icon: Shield,
              color: 'from-emerald-500 to-green-500',
            },

            {
              title: 'Appearance',
              desc: 'Theme and interface customization',
              icon: Monitor,
              color: 'from-sky-500 to-cyan-500',
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  group

                  relative

                  overflow-hidden

                  rounded-3xl

                  border border-white/40

                  bg-white/60

                  backdrop-blur-xl

                  p-5

                  transition-all
                  duration-300

                  hover:-translate-y-[2px]
                  hover:bg-white
                  hover:shadow-xl
                  hover:shadow-black/[0.04]
                "
              >
                {/* ICON */}

                <div
                  className={`
                    w-12
                    h-12

                    rounded-2xl

                    bg-gradient-to-br

                    flex items-center
                    justify-center

                    shadow-lg

                    ${item.color}
                  `}
                >
                  <Icon
                    size={20}
                    className="
                      text-white
                    "
                  />
                </div>

                {/* TEXT */}

                <div
                  className="
                    mt-4
                  "
                >
                  <h3
                    className="
                      text-sm
                      font-semibold

                      text-gray-900
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-1

                      text-xs
                      leading-relaxed

                      text-gray-500
                    "
                  >
                    {item.desc}
                  </p>
                </div>

                {/* MOCK SWITCH */}

                <div
                  className="
                    mt-5

                    flex items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      text-xs
                      font-medium

                      text-gray-400
                    "
                  >
                    Coming soon
                  </span>

                  <div
                    className="
                      w-11
                      h-6

                      rounded-full

                      bg-indigo-500

                      relative
                    "
                  >
                    <div
                      className="
                        absolute
                        top-1
                        right-1

                        w-4
                        h-4

                        rounded-full

                        bg-white
                      "
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER */}

        <div
          className="
            relative z-10

            flex items-center
            justify-between

            px-8
            py-5

            border-t border-white/30
          "
        >
          <p
            className="
              text-xs
              text-gray-400
            "
          >
            Focus Tracker MVP • Settings preview
          </p>

          <button
            onClick={onClose}
            className="
              h-11

              px-5

              rounded-2xl

              bg-gradient-to-r
              from-indigo-500
              to-violet-500

              text-sm
              font-medium

              text-white

              shadow-lg
              shadow-indigo-500/20

              hover:scale-[1.02]

              transition-all
            "
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
