export interface IImage {
  id?: string;
  url: string;
}

export class Image implements IImage {
  id?: string;
  url: string;

  constructor() {
    this.url = '';
  }
}
