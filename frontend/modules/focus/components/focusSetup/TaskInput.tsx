//frontend/modules/focus/components/focusSetup/TaskInput.tsx

'use client';

import { useMemo, useRef, useState } from 'react';

import { Brain, Sparkles, X } from 'lucide-react';

import { useClickOutside } from '@/hooks/useClickOutside';

type Props = {
  value: string;

  onChange: (value: string) => void;
};

// ======================
// STATIC SUGGESTIONS
// ======================

const TASK_SUGGESTIONS = [
  'Programming',
  'Debugging',
  'Studying',
  'Reading',
  'Writing Documentation',
  'Research',
  'UI Design',
  'Learning React',
  'Coding Interview Prep',
  'Backend Development',
  'Frontend Development',
  'Database Modeling',
  'Testing',
  'Code Review',
  'Machine Learning',
];

// ======================
// COMPONENT
// ======================

export function TaskInput({ value, onChange }: Props) {
  // ======================
  // STATE
  // ======================

  const [input, setInput] = useState('');

  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false), open);

  // ======================
  // FILTERED
  // ======================

  const filteredSuggestions = useMemo(() => {
    if (!input.trim()) {
      return TASK_SUGGESTIONS.slice(0, 5);
    }

    return TASK_SUGGESTIONS.filter((task) =>
      task.toLowerCase().includes(input.toLowerCase())
    ).slice(0, 6);
  }, [input]);

  // ======================
  // SELECT
  // ======================

  const handleSelect = (task: string) => {
    onChange(task);

    setInput('');

    setOpen(false);
  };

  // ======================
  // REMOVE
  // ======================

  const handleRemove = () => {
    onChange('');

    setInput('');

    setOpen(false);
  };

  return (
    <div
      ref={ref}
      className="
        relative
      "
    >
      {/* CONTAINER */}

      <div
        className="
          min-h-[52px]

          px-3 py-2

          rounded-2xl

          border border-gray-200

          bg-white/80

          shadow-sm

          flex items-center
          gap-2

          focus-within:ring-2
          focus-within:ring-indigo-500/20
          focus-within:border-indigo-300

          transition
        "
      >
        {/* TAG */}

        {value && (
          <div
            className="
              h-8

              pl-3
              pr-2

              rounded-xl

              bg-gradient-to-r
              from-indigo-500
              to-violet-500

              text-white

              flex items-center
              gap-2

              shadow-md
              shadow-indigo-500/20
            "
          >
            <Brain size={12} />

            <span
              className="
                text-xs
                font-medium
              "
            >
              {value}
            </span>

            <button
              onClick={handleRemove}
              className="
                hover:bg-white/20

                rounded-md

                p-0.5

                transition
              "
            >
              <X size={12} />
            </button>
          </div>
        )}

        {/* INPUT */}

        {!value && (
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);

              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="What are you working on?"
            className="
              flex-1

              bg-transparent

              text-sm
              text-gray-700

              outline-none

              placeholder:text-gray-400
            "
          />
        )}
      </div>

      {/* DROPDOWN */}

      {open && !value && filteredSuggestions.length > 0 && (
        <div
          className="
              absolute
              top-full
              left-0
              right-0

              mt-2

              z-[100]

              overflow-hidden

              rounded-3xl

              border border-white/40

              bg-white/90
              backdrop-blur-2xl

              shadow-2xl
              shadow-black/10

              p-2
            "
        >
          {/* HEADER */}

          <div
            className="
                px-3
                pb-2

                flex items-center
                gap-2

                text-[11px]
                font-medium
                text-gray-400
              "
          >
            <Sparkles size={12} />
            Suggested focus tasks
          </div>

          {/* OPTIONS */}

          <div
            className="
                space-y-1
              "
          >
            {filteredSuggestions.map((task) => (
              <button
                key={task}
                onClick={() => handleSelect(task)}
                className="
                    w-full

                    flex items-center
                    gap-3

                    px-3 py-2.5

                    rounded-2xl

                    text-left

                    hover:bg-indigo-50

                    transition-all
                  "
              >
                {/* ICON */}

                <div
                  className="
                      w-8 h-8

                      rounded-xl

                      bg-gradient-to-br
                      from-indigo-500
                      to-violet-500

                      flex items-center
                      justify-center

                      shadow-md
                      shadow-indigo-500/20

                      shrink-0
                    "
                >
                  <Brain
                    size={14}
                    className="
                        text-white
                      "
                  />
                </div>

                {/* TEXT */}

                <div>
                  <div
                    className="
                        text-sm
                        font-medium
                        text-gray-800
                      "
                  >
                    {task}
                  </div>

                  <div
                    className="
                        text-xs
                        text-gray-400
                      "
                  >
                    Focus session task
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
