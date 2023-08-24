import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Map } from 'maplibre-gl';
import { Article } from '../../core/interfaces/article';
import { StateService } from './../../core/services/state/state.service';
import { Base } from 'src/app/core/directives/base.directive';
import { ArticleService } from 'src/app/core/services/article/article.service';
import { LocationService } from 'src/app/core/services/location/location.service';
import { State } from 'src/app/core/interfaces/state';
import { FormService } from 'src/app/core/services/form/form.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { Observable, distinctUntilChanged } from 'rxjs';
import { ILocation, IMapAttributes } from 'src/app/core/interfaces/location';

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
export class MapComponent extends Base implements AfterViewInit, OnDestroy {
  @ViewChild('map')
  map: any;
  currentCoordinates: IMapAttributes = { longitude: 139.753, latitude: 35.6844, zoom: 14 };
  articles: Observable<Article[]>;
  state: State;
  prevState: State;
  constructor(
    private service: ArticleService,
    private locationService: LocationService,
    private stateService: StateService,
    public formService: FormService,
  ) {
    super();
    this.articles = this.service.model;
  }

  async ngAfterViewInit() {
    this.locationService
      .getLocation()
      .pipe(this.takeUntilDestroy())
      .subscribe((data: ILocation) => {
        this.currentCoordinates = { ...this.currentCoordinates, ...data }

      });

    this.stateService.model
      .pipe(
        this.takeUntilDestroy(),
        distinctUntilChanged((prev, curr) => {
          console.log('CHECKING DISTINCT:', prev, curr);
          return prev.name === curr.name;
        }),
      )
      .subscribe((state) => {
        this.prevState = this.state;
        this.state = state;
        // console.log('IT IS DISTINCT', this.prevState, this.state)
        if (state.name == 'articleDetails') {
          // move map
          this.map.mapInstance.flyTo({
            center: state.data.coordinates,
            speed: 0.2,
            curve: 1,
            zoom: this.currentCoordinates.zoom + 1,
          });
        }
      });
  }

  sendMouseCoordinates(event: any) {
    if (['addArticleLocation'].includes(this.state?.name)) {
      this.locationService.setMouseCoordinates(
        { longitude: event.lngLat.wrap().lng, latitude: event.lngLat.wrap().lat }
      );
    }
  }

  async retrieveArticles(event: any) {
    console.log('zoom ended: ', event.target.style.z);
    // TODO maybe renable this on some other condition
    // await this.service.getArticles('current', {
    //   distance: ((-1923 * event.target.style.z) + 34000)
    // })
  }

  override ngOnDestroy() {
    this.map?.remove();
    super.ngOnDestroy();
  }
}
