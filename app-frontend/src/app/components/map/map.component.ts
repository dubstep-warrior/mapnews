import { Component, ViewChild } from '@angular/core';
import { Article } from '../../core/interfaces/article.interface.';
import { StateService } from './../../core/services/state/state.service';
import { ArticleService } from 'src/app/core/services/article/article.service';
import { LocationService } from 'src/app/core/services/location/location.service';
import { State } from 'src/app/core/interfaces/state.interface';
import { FormService } from 'src/app/core/services/form/form.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { Observable, distinctUntilChanged } from 'rxjs';
import {
  ILocation,
  IMapAttributes,
} from 'src/app/core/interfaces/location.interface';
import { MapMouseEvent } from 'maplibre-gl';
import { EventData } from '@maplibre/ngx-maplibre-gl';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-map',
  animations: [
    trigger('locationDrop', [
      transition(':enter', [
        style({
          width: '500px',
          backgroundColor: 'white',
          position: 'absolute',
          top: '-100px',
          opacity: 0,
        }),
        animate(
          '1000ms',
          style({
            width: '500px',
            backgroundColor: 'black',
            position: 'absolute',
            top: '0px',
            opacity: 1,
          }),
        ),
      ]),
      transition(':leave', [
        style({ top: '0px', opacity: 1 }),
        animate('1000ms', style({ top: '-100px', opacity: 0 })),
      ]),
    ]),
  ],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent {
  @ViewChild('map')
  map: any;
  currentCoordinates: IMapAttributes = { zoom: 14 };
  articles: Observable<Article[]>;
  state: State;
  prevState: State;
  constructor(
    private service: ArticleService,
    private locationService: LocationService,
    private stateService: StateService,
    public formService: FormService,
  ) {
    this.articles = this.service.model;
    this.locationService
      .getLocation()
      .pipe(takeUntilDestroyed())
      .subscribe((data: ILocation) => {
        this.currentCoordinates = { ...this.currentCoordinates, ...data };
      });

    this.stateService.model
      .pipe(
        takeUntilDestroyed(),
        distinctUntilChanged((prev, curr) => {
          return prev.name === curr.name;
        }),
      )
      .subscribe((state) => {
        this.prevState = this.state;
        this.state = state;
        if (state.name == 'articleDetails') {
          this.map.mapInstance.flyTo({
            center: state.data.coordinates,
            speed: 0.2,
            curve: 1,
            zoom: this.currentCoordinates.zoom + 1,
          });
        }
      });
  }

  sendMouseCoordinates(event: MapMouseEvent & EventData) {
    if (['addArticleLocation'].includes(this.state?.name)) {
      this.locationService.setMouseCoordinates({
        longitude: event.lngLat.wrap().lng,
        latitude: event.lngLat.wrap().lat,
      });
    }
  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
