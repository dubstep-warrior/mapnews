import { Injectable } from '@angular/core';
import { LocationService } from '../../services/location/location.service';
import { ArticleService } from '../../services/article/article.service';
import { IResponse } from '../../interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationResolver {
  constructor(
    private service: LocationService,
    private articleService: ArticleService,
  ) {}

  async resolve(): Promise<IResponse> {
    return this.service.init().then((data) => {
      return this.articleService.getArticles('relevant', data);
    });
  }
}
