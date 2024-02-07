/**
 * Compresses the image to the given dimensions
 * 
 * @param src The source image to compress, as a base64 string
 * @param width new width
 * @param height new height
 * @returns A promise that resolves to the compressed image as a base64 string
 */
export function compressImage(src: string, width: number, height: number): Promise<string> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const context2D: CanvasRenderingContext2D | null = canvas.getContext('2d');
      if (context2D) {
        const scale = Math.min(width / img.width, height / img.height);
        const x = (width / 2) - (img.width / 2) * scale;
        const y = (height / 2) - (img.height / 2) * scale;
        context2D.drawImage(img, x, y, img.width * scale, img.height * scale);
        const data = context2D.canvas.toDataURL();
        res(data);
      } else {
        rej(new Error('Failed to get 2D rendering context'));
      }
    };
    img.onerror = error => rej(error);
  });
}

/**
 * Converts an image from an input element to a base64 string
 * 
 * @param fileInput The input element containing the image
 * @param width The desired width of the image
 * @param height The desired height of the image
 * @returns A promise that resolves to the compressed image as a base64 string
 */
export function convertImageFromInput(fileInput: HTMLInputElement, width: number, height: number): Promise<string> {
  return new Promise((res, rej) => {
    if (!fileInput.files || fileInput.files.length === 0) {
      rej(new Error('No files selected'));
    } else {
      const reader: FileReader = new FileReader();
      reader.readAsDataURL(fileInput.files[0]);
      reader.addEventListener('loadend', e => {
        compressImage(reader.result as string, width, height).then((data: string) => {
          res(data);
        });
      });
    }
  });
}