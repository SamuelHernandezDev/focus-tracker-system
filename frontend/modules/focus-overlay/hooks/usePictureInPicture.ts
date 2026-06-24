//frontend\modules\focus-overlay\hooks\usePictureInPicture.ts
'use client';

import { useState } from 'react';
import { pipService } from '../services/pip.service';

export function usePictureInPicture() {
  const [isOpen, setIsOpen] = useState(false);

  const openPiP = async () => {
    await pipService.open();
    setIsOpen(true);
  };

  const closePiP = () => {
    pipService.close();
    setIsOpen(false);
  };

  return {
    isOpen,
    openPiP,
    closePiP,
  };
}
