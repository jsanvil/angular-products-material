import { Component, Input } from '@angular/core';
import { ImageService } from '../services/image.service';
import { IImage } from '../interfaces/image';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent {
  @Input({required: true}) image?:IImage;
  @Input() name: string = '';
  @Input() size: number = 100;

  constructor(private _imageService: ImageService) { }
}
