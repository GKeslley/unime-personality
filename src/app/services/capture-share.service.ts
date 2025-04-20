import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import { Share } from '@capacitor/share';
import { Filesystem, Directory } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class CaptureShareService {

  constructor() {}

  async captureElementAndShare(
    element: HTMLElement,
    options?: {
      fileName?: string
    }
  ) {
    try {
        const canvas = await html2canvas(element, {
            allowTaint: true,
            useCORS: true,
            logging: false
        });

        const dataUrl = canvas.toDataURL('image/png');
        const base64 = dataUrl.split(',')[1];

        const fileName = options?.fileName || 'capture.png';

        // Save to filesystem
        const result = await Filesystem.writeFile({
            path: fileName,
            data: base64,
            directory: Directory.Cache
        });

        await Share.share({
            files: [result.uri]
        });
    } catch (error) {
        console.error('Error capturing and sharing:', error);
        throw error;
    }
  }
}
