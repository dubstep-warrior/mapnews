import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Map } from 'maplibre-gl';
import { Article } from 'src/app/interfaces/article';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  map: Map | undefined;
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;
  startingCoordinates: any = { lng: 139.753, lat: 35.6844, zoom: 14 };
  articles: Article[] = [];

  ngOnInit() {}

  ngAfterViewInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.startingCoordinates = {
            lng: position.coords.longitude,
            lat: position.coords.latitude,
          };
          for (let i = 0; i < 30; i++) {
            let tagsArr = []
            for(let i = 0 ; i < Math.floor(Math.random() * 20 + 3); i ++) {
              tagsArr.push(`${(Math.random() + 1).toString(36).substring(7)}`)
            }
            this.articles.push({
              id: `${(Math.random() + 1).toString(36).substring(7)}`,
              title: `Title Heading`,
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ac auctor ipsum. Sed commodo est nec eros mollis, vitae faucibus justo ultricies. Vestibulum varius orci nibh, vitae hendrerit dolor efficitur ac. Vivamus vel condimentum erat. Morbi consequat luctus sem, eu scelerisque mi feugiat id. Vivamus vestibulum metus faucibus risus ultricies, fringilla fringilla augue vehicula. Integer mattis mauris quis orci convallis, ac pharetra ante interdum. Fusce volutpat finibus nisi, ultricies lobortis neque. Sed sed leo ut diam ultricies maximus sed in libero. Ut nibh odio, scelerisque sit amet auctor id, facilisis nec ligula. Quisque semper rutrum lorem id scelerisque. Aenean fermentum.',
              lng: position.coords.longitude + (Math.random() < 0.5 ? Math.random() * -0.05 : Math.random() * 0.05),
              lat: position.coords.latitude + (Math.random() < 0.5 ? Math.random() * -0.05 : Math.random() * 0.05),
              tags: tagsArr
            } as Article);
          }
        },
        () => {
          console.error('Error: The Geolocation service failed.');
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Error: Your browser doesn't support geolocation.");
    }
 
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
