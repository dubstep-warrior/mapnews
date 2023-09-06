import { Component, OnInit, Input } from '@angular/core';
import { PreviewImage } from 'src/app/core/interfaces/preview-image.interface';

@Component({
  selector: 'app-multi-item-carousel',
  templateUrl: './multi-item-carousel.component.html',
  styleUrls: ['./multi-item-carousel.component.scss'],
})
export class MultiItemCarouselComponent implements OnInit {
  @Input() images: Array<PreviewImage>;

  constructor() {}

  ngOnInit(): void {}

  getNumScroll(arrLength: number): number {
    return Math.floor(arrLength / 3);
  }
}
