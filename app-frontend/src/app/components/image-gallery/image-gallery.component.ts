import { Component, Input } from '@angular/core';
import GeneralConfig from './../../core/configs/general.config.json';

type ThumbnailPosition = 'bottom' | 'top' | 'left' | 'right';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent {
  @Input() images: Array<string>;
  position: ThumbnailPosition = 'bottom';
  positionOptions = GeneralConfig['image-gallery'].positionOptions;
  responsiveOptions = GeneralConfig['image-gallery'].responsiveOptions;
}
