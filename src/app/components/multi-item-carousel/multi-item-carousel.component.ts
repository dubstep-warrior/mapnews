import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-multi-item-carousel',
  templateUrl: './multi-item-carousel.component.html',
  styleUrls: ['./multi-item-carousel.component.scss'],
})
export class MultiItemCarouselComponent implements OnInit {
  @Input() images: Array<File>; 
    responsiveOptions: any;

    constructor() {
         
    }

    ngOnInit(): void { 

        this.responsiveOptions = [{
          breakpoint: '1024px',
          numVisible: 1,
          numScroll: this.images.length
      }];
    }
}
