import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-multi-item-carousel',
  templateUrl: './multi-item-carousel.component.html',
  styleUrls: ['./multi-item-carousel.component.scss'],
})
export class MultiItemCarouselComponent implements OnInit {
  @Input() images: Array<any>;

  constructor() {}

  ngOnInit(): void {}

  getNumScroll(arrLength: number): number {
    return Math.floor(arrLength / 3);
  }
}
