//frontend\modules\focus-overlay\services\pip.service.ts
import { createRoot } from 'react-dom/client';
import { FocusOverlay } from '../components/FocusOverlay';

class PiPService {
  private pipWindow: Window | null = null;

  async open() {
    if (!('documentPictureInPicture' in window)) {
      alert('Document Picture-in-Picture no soportado');
      return;
    }

    if (this.pipWindow) {
      this.pipWindow.focus();
      return;
    }

    const pipWindow = await (
      window as any
    ).documentPictureInPicture.requestWindow({
      width: 320,
      height: 180,
    });

    this.pipWindow = pipWindow;

    const container = pipWindow.document.createElement('div');

    pipWindow.document.body.style.margin = '0';

    pipWindow.document.body.appendChild(container);

    const root = createRoot(container);

    root.render(<FocusOverlay />);

    pipWindow.addEventListener('pagehide', () => {
      this.pipWindow = null;
    });
  }

  close() {
    this.pipWindow?.close();
    this.pipWindow = null;
  }

  isOpen() {
    return !!this.pipWindow;
  }
}

export const pipService = new PiPService();
