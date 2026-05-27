//frontend\modules\focus\components\focusSetup\AllowedSitesInput.tsx
'use client';

import { Globe, Plus, Sparkles, X } from 'lucide-react';

import { KeyboardEvent, useMemo, useRef, useState } from 'react';

import { useClickOutside } from '@/hooks/useClickOutside';

type Props = {
  value: string[];

  onChange: (sites: string[]) => void;
};

// ======================
// SUGGESTIONS
// ======================

const SITE_SUGGESTIONS = [
  'github.com',
  'stackoverflow.com',
  'chat.openai.com',
  'notion.so',
  'figma.com',
  'youtube.com',
  'developer.mozilla.org',
  'docs.python.org',
  'react.dev',
  'vercel.com',
];

// ======================
// COMPONENT
// ======================

export function AllowedSitesInput({ value, onChange }: Props) {
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
    return SITE_SUGGESTIONS.filter(
      (site) =>
        site.toLowerCase().includes(input.toLowerCase()) &&
        !value.includes(site)
    ).slice(0, 6);
  }, [input, value]);

  // ======================
  // ADD SITE
  // ======================

  const addSite = (site: string) => {
    if (!site.trim()) return;

    if (value.includes(site)) return;

    onChange([...value, site]);

    setInput('');

    setOpen(false);
  };

  // ======================
  // REMOVE
  // ======================

  const removeSite = (site: string) => {
    onChange(value.filter((s) => s !== site));
  };

  // ======================
  // KEYDOWN
  // ======================

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      addSite(input);
    }
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

          flex flex-wrap
          items-center

          gap-2

          focus-within:ring-2
          focus-within:ring-emerald-500/20
          focus-within:border-emerald-300

          transition
        "
      >
        {/* TAGS */}

        {value.map((site) => (
          <div
            key={site}
            className="
              h-8

              pl-3
              pr-2

              rounded-xl

              bg-gradient-to-r
              from-emerald-500
              to-green-500

              text-white

              flex items-center
              gap-2

              shadow-md
              shadow-emerald-500/20
            "
          >
            <Globe size={12} />

            <span
              className="
                text-xs
                font-medium
              "
            >
              {site}
            </span>

            <button
              onClick={() => removeSite(site)}
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
        ))}

        {/* INPUT */}

        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);

            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={
            value.length === 0 ? 'Add allowed sites...' : 'Add another...'
          }
          className="
            flex-1

            min-w-[140px]

            bg-transparent

            text-sm
            text-gray-700

            outline-none

            placeholder:text-gray-400
          "
        />
      </div>

      {/* DROPDOWN */}

      {open && filteredSuggestions.length > 0 && (
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
            Suggested allowed sites
          </div>

          {/* OPTIONS */}

          <div
            className="
              space-y-1
            "
          >
            {filteredSuggestions.map((site) => (
              <button
                key={site}
                onClick={() => addSite(site)}
                className="
                  w-full

                  flex items-center
                  justify-between

                  px-3 py-2.5

                  rounded-2xl

                  text-left

                  hover:bg-emerald-50

                  transition-all
                "
              >
                <div
                  className="
                    flex items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      w-8 h-8

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

                  <span
                    className="
                      text-sm
                      font-medium
                      text-gray-800
                    "
                  >
                    {site}
                  </span>
                </div>

                <Plus
                  size={14}
                  className="
                    text-gray-400
                  "
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
