//frontend\modules\focus-overlay\types\document-pip.d.ts
interface Window {
  documentPictureInPicture: {
    requestWindow(options?: {
      width?: number;
      height?: number;
    }): Promise<Window>;
  };
}
