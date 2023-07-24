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
  map: Map | undefined;
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;
  currentCoordinates: any = { lng: 139.753, lat: 35.6844, zoom: 14 };
  articles: Article[] = [];
  state: State;
  prevState: State;
  constructor(
    private service: ArticleService,
    private locationService: LocationService,
    private stateService: StateService,
    public formService: FormService,
  ) {
    super();
  }

  async ngAfterViewInit() {
    this.service.model.pipe(this.takeUntilDestroy()).subscribe((data) => {
      console.log(data);
      if (data.type == 'article') {
        this.articles = [...this.articles, data.data];
      } else if (data.type == 'update') {
        console.log(data.data);
        this.articles = this.articles.map((article) =>
          data.data?._id == article._id ? data.data : article,
        );
      } else {
        this.articles = data.data;
      }
    });

    this.locationService
      .getLocation()
      .pipe(this.takeUntilDestroy())
      .subscribe((data) => {
        console.log('rep', data);
        this.currentCoordinates = {
          ...this.currentCoordinates,
          lng: data.longitude,
          lat: data.latitude,
        };

        // this.startingCoordinates = {
        //   lng: 103.77431291838502,
        //   lat: 1.3295169515211853,
        // };
      });

    this.stateService.model.pipe(this.takeUntilDestroy()).subscribe((data) => {
      this.prevState = this.state;
      this.state = data;
    });
  }

  sendMouseCoordinates(event: any) {
    if (['addArticleLocation'].includes(this.state?.name)) {
      this.locationService.setMouseCoordinates(
        JSON.stringify(event.lngLat.wrap()),
      );
    }
  }

  override ngOnDestroy() {
    this.map?.remove();
    super.ngOnDestroy();
  }
}
