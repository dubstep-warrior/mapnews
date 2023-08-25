import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { LocationService } from '../../services/location/location.service';
import { ArticleService } from '../../services/article/article.service';
import { ILocation } from '../../interfaces/location';

@Injectable({
  providedIn: 'root',
})
export class LocationResolver implements Resolve<ILocation> {
  constructor(
    private service: LocationService,
    private articleService: ArticleService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<ILocation> {
    return this.service.init().then((data) => {
      return this.articleService.getArticles('relevant', data);
    });
  }
}
