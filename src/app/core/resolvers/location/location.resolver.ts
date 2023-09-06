import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { LocationService } from '../../services/location/location.service';
import { ArticleService } from '../../services/article/article.service';
import { IResponse } from '../../interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationResolver implements Resolve<IResponse> {
  constructor(
    private service: LocationService,
    private articleService: ArticleService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<IResponse> {
    return this.service.init().then((data) => {
      return this.articleService.getArticles('relevant', data);
    });
  }
}
