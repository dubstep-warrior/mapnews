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

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent extends Base implements OnInit, OnDestroy {
  map: Map | undefined;
  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;
  startingCoordinates: any = { lng: 139.753, lat: 35.6844, zoom: 14 };
  articles: Article[] = [];
  state: State;

  constructor(
    private service: ArticleService,
    private locationService: LocationService,
    private stateService: StateService
  ) {
    super();
  }

  async ngOnInit() {
    this.service.model
      .pipe(this.takeUntilDestroy())
      .subscribe((data) => (this.articles = data));

    this.locationService
      .getLocation()
      .pipe(this.takeUntilDestroy())
      .subscribe((data) => {
        console.log('rep', data);
        this.startingCoordinates = {
          lng: data.coords.longitude,
          lat: data.coords.latitude,
        };
      });

    this.stateService.model.pipe(this.takeUntilDestroy()).subscribe(data => {
      this.state = data
    })
    await this.service.getArticles();
  }

  sendMouseCoordinates(event: any) {
    if(['addArticleLocation'].includes(this.state?.name)) {
      this.locationService.setMouseCoordinates(JSON.stringify(event.lngLat.wrap())) 
    }
  }

  override ngOnDestroy() {
    this.map?.remove();
    super.ngOnDestroy();
  }
}
