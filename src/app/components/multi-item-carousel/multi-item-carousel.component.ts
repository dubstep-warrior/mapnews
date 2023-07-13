import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multi-item-carousel',
  templateUrl: './multi-item-carousel.component.html',
  styleUrls: ['./multi-item-carousel.component.scss'],
})
export class MultiItemCarouselComponent implements OnInit {
  images: Array<any>; 
    responsiveOptions: any;

    constructor() {
         
    }

    ngOnInit(): void {
        this.images = [
          { random: 'Random', picture: 'https://picsum.photos/id/944/900/500' },
          { random: 'Samoa', picture: 'https://picsum.photos/id/1011/900/500' },
          { random: 'Tonga', picture: 'https://picsum.photos/id/984/900/500' },
          {
            random: 'Cook Island',
            picture: 'https://picsum.photos/id/1/900/500',
          },
          { random: 'Niue', picture: 'https://picsum.photos/id/22/900/500' },
          {
            random: 'American Samoa',
            picture: 'https://picsum.photos/id/982/900/500',
          },
        ];

        this.responsiveOptions = [{
          breakpoint: '1024px',
          numVisible: 1,
          numScroll: this.images.length
      }];
    }
}
