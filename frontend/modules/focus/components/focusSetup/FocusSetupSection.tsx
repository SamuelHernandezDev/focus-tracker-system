//frontend\modules\focus\components\focusSetup\FocusSetupSection.tsx
'use client';

import { Brain, Globe } from 'lucide-react';

import { TaskInput } from './TaskInput';

import { AllowedSitesInput } from './AllowedSitesInput';

type Props = {
  task: string;

  allowedSites: string[];

  onTaskChange: (value: string) => void;

  onAllowedSitesChange: (value: string[]) => void;

  invalidTask?: boolean;

  invalidSites?: boolean;
};

export function FocusSetupSection({
  task,
  allowedSites,
  onTaskChange,
  onAllowedSitesChange,
  invalidTask,
  invalidSites,
}: Props) {
  return (
    <div
      className="
        relative

        overflow-visible

        rounded-3xl

        border border-white/40

        bg-gradient-to-br
        from-white
        via-white
        to-slate-50/80

        p-7

        shadow-sm
      "
    >
      {/* GLOW */}

      <div
        className="
          absolute
          top-0 right-0

          w-64 h-64

          bg-indigo-400/5

          rounded-full

          blur-3xl
        "
      />

      {/* CONTENT */}

      <div
        className="
          relative z-10

          space-y-6
        "
      >
        {/* HEADER */}

        <div>
          <h2
            className="
              text-lg
              font-semibold
              text-gray-900
            "
          >
            Session Setup
          </h2>

          <p
            className="
              mt-1

              text-sm
              text-gray-500
            "
          >
            Configure your focus environment before starting the session
          </p>
        </div>

        {/* TASK */}

        <div
          className={`
    space-y-2

    transition-all
    duration-300

    ${
      invalidTask
        ? `

        `
        : ''
    }
  `}
        >
          <label
            className="
              text-sm
              font-medium
              text-gray-600

              flex items-center
              gap-2
            "
          >
            <div
              className="
                w-7 h-7

                rounded-xl

                bg-gradient-to-br
                from-blue-500
                to-indigo-500

                flex items-center
                justify-center

                shadow-md
                shadow-blue-500/20
              "
            >
              <Brain
                size={14}
                className="
                  text-white
                "
              />
            </div>
            Task
          </label>

          <TaskInput value={task} onChange={onTaskChange} />

          {invalidTask && (
            <p
              className="
      pl-1

      text-xs
      font-medium

      text-rose-500

      animate-in
      fade-in
      slide-in-from-top-1
      duration-300
    "
            >
              Please select a task before starting
            </p>
          )}
        </div>

        {/* ALLOWED SITES */}

        <div
          className={`
    space-y-2

    transition-all
    duration-300

    ${
      invalidSites
        ? `
  
        `
        : ''
    }
  `}
        >
          <label
            className="
              text-sm
              font-medium
              text-gray-600

              flex items-center
              gap-2
            "
          >
            <div
              className="
                w-7 h-7

                rounded-xl

                bg-gradient-to-br
                from-emerald-500
                to-green-500

                flex items-center
                justify-center

                shadow-md
                shadow-emerald-500/20
              "
            >
              <Globe
                size={14}
                className="
                  text-white
                "
              />
            </div>
            Allowed Sites
          </label>
          <AllowedSitesInput
            value={allowedSites}
            onChange={onAllowedSitesChange}
          />
          {invalidSites && (
            <p
              className="
      pl-1

      text-xs
      font-medium

      text-amber-600

      animate-in
      fade-in
      slide-in-from-top-1
      duration-300
    "
            >
              Add at least one allowed site
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
