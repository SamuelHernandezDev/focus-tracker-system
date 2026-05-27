//frontend/app/(app)/focus/page.tsx

'use client';

import { useEffect, useState } from 'react';

import { Brain } from 'lucide-react';

import { useFocusSession } from '@/modules/focus/hooks/useFocusSession';

import CameraPreview from '@/modules/focus/components/CameraPreview';

import { PageHeader } from '@/components/ui/PageHeader';

import { FocusSetupSection } from '@/modules/focus/components/focusSetup/FocusSetupSection';

import { FocusSensorsSection } from '@/modules/focus/components/focusSetup/FocusSensorsSection';

import { FocusStatusSection } from '@/modules/focus/components/focusSetup/FocusStatusSection';

import { FocusControlsSection } from '@/modules/focus/components/focusSetup/FocusControlsSection';

export default function FocusPage() {
  // ======================
  // LOCAL STATE
  // ======================

  const [task, setTask] = useState('');

  const [allowedSites, setAllowedSites] = useState<string[]>([]);

  const [cameraEnabled, setCameraEnabled] = useState(false);

  const [attemptedStart, setAttemptedStart] = useState(false);

  useEffect(() => {
    if (!attemptedStart) return;

    const timeout = setTimeout(() => {
      setAttemptedStart(false);
    }, 3500);

    return () => clearTimeout(timeout);
  }, [attemptedStart]);

  useEffect(() => {
    if (task.trim() && allowedSites.length > 0) {
      setAttemptedStart(false);
    }
  }, [task, allowedSites]);

  // ======================
  // SESSION
  // ======================

  const {
    start,

    stop,

    sessionId,

    sessionActive,

    loading,
  } = useFocusSession();

  // ======================
  // START
  // ======================

  const handleStart = async () => {
    setAttemptedStart(true);

    if (!task.trim() || allowedSites.length === 0) {
      return;
    }

    try {
      await start(task, allowedSites);
    } catch {
      alert('Error starting session');
    }
  };

  // ======================
  // STOP
  // ======================

  const handleStop = async () => {
    try {
      const result = await stop();

      alert(`Score: ${result?.score}`);
    } catch {
      alert('Error stopping session');
    }
  };

  const missingTask = !task.trim();

  const missingSites = allowedSites.length === 0;

  const canStart = !missingTask && !missingSites;

  return (
    <div
      className="
      h-[calc(94vh-64px)]

      flex flex-col

      bg-gray-50

      overflow-hidden
    "
    >
      {/* PAGE HEADER */}

      <div
        className="
        px-8
        pt-6
        pb-3

        shrink-0
      "
      >
        <PageHeader
          icon={Brain}
          title="Focus Tracker"
          description="Configure and start your AI-powered focus tracking session"
        />
      </div>

      {/* CONTENT */}

      <div
        className="
        flex-1

        px-8
        pb-6

        min-h-0
      "
      >
        {/* GRID */}

        <div
          className="
          h-full

          grid

          xl:grid-cols-[1.05fr_0.95fr]

          gap-4
        "
        >
          {/* LEFT COLUMN */}

          <div
            className="
            flex flex-col

            gap-4

            min-h-0
          "
          >
            <FocusSetupSection
              task={task}
              allowedSites={allowedSites}
              onTaskChange={setTask}
              onAllowedSitesChange={setAllowedSites}
              invalidTask={attemptedStart && !task.trim()}
              invalidSites={attemptedStart && allowedSites.length === 0}
            />

            <FocusSensorsSection
              cameraEnabled={cameraEnabled}
              onToggleCamera={() => setCameraEnabled((prev) => !prev)}
            />

            <FocusStatusSection
              sessionActive={sessionActive}
              sessionId={sessionId}
            />

            <FocusControlsSection
              sessionActive={sessionActive}
              loading={loading}
              onStart={handleStart}
              onStop={handleStop}
            />
          </div>

          {/* RIGHT COLUMN */}

          <div
            className="
            min-h-0
          "
          >
            <CameraPreview
              enabled={sessionActive}
              sessionId={sessionId}
              cameraEnabled={cameraEnabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
