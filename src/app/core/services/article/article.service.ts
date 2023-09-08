import { Injectable } from '@angular/core';
import { ServerService } from '../server/server.service';
import { BehaviorSubject } from 'rxjs';
import { StateService } from '../state/state.service';
import { FormGroup } from '@angular/forms';
import { Article, GetArticleParams } from '../../interfaces/article.interface.';
import { LocationService } from '../location/location.service';
import { WebSocketService } from '../ws/web-socket.service';
import { AuthService } from '../auth/auth.service';
import { AuthStatus } from '../../interfaces/auth.interface';
import { PreviewImage } from '../../interfaces/preview-image.interface';
import { IResponse } from '../../interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  authStatus: AuthStatus;
  private articles: Article[] = [];
  model: BehaviorSubject<Article[]>;
  api: string = 'api/v1/article';
  current: string = 'relevant';
  navMapping: any = {
    favourites: '/favourites',
    relevant: '/relevant',
    new: '/new',
    myposts: '/self',
    search: '/search',
  };
  constructor(
    private service: ServerService,
    private authService: AuthService,
    private stateService: StateService,
    private locationService: LocationService,
    private wsService: WebSocketService,
  ) {
    this.model = new BehaviorSubject([]);
    this.authService.authStatusSubject.pipe().subscribe((status) => {
      this.authStatus = status;
    });
  }

  getArticles: (arg: string, param?: GetArticleParams) => Promise<IResponse> =
    async (key, params) => {
      this.current = key == 'current' ? this.current : key;

      const res = await this.service.get(
        `${this.api}${this.navMapping[this.current]}`,
        { ...this.locationService.currentLocation, ...params },
      );
      if (res && res.success) {
        this.articles = res.data;
        this.model.next(this.articles);
        if (!!params) {
          this.wsService.send({
            name: 'searchedArticles',
            data: params,
          });
        }
      } else {
        console.log(res.error);
      }
      return res;
    };

  report: (arg: FormGroup) => Promise<IResponse> = async (form: FormGroup) => {
    let formData = new FormData();
    Object.keys(form.value).forEach((key) => {
      if (form.value[key]) {
        if (key == 'images') {
          form.value[key].forEach((image: PreviewImage) => {
            formData.append(key, image.file);
          });
        } else {
          formData.append(key, JSON.stringify(form.value[key]));
        }
      }
    });
    this.stateService.resolveState('submittingArticle');
    const res = await this.service.post(this.api, formData);
    if (res && res.success) {
      this.articles = [...this.articles, res.data];
      this.model.next(this.articles);
      this.wsService.send({
        name: 'postedArticle',
        data: res.data,
      });
    }
    this.stateService.resolveState('submitAttempted', { success: res.success });
    return res;
  };

  resolveArticleLikes: (arg: string) => Promise<void> = async (id) => {
    const res = await this.service.post(`${this.api}/like`, { articleId: id });
    if (res && res.success) {
      this.articles = this.articles.map((article) =>
        res.data?._id == article._id ? res.data : article,
      );
      this.model.next(this.articles);

      if (res.data.likes?.includes(this.authStatus?.id)) {
        this.wsService.send({
          name: 'likedArticle',
          data: res.data,
        });
      }

      if (this.stateService.state.name == 'articleDetails') {
        this.stateService.model.next({
          name: this.stateService.state.name,
          data: res.data,
        });
      }
    }
  };

  addNotificationArticle: (arg: Article) => void = (article) => {
    if (!this.articles.some((currArticle) => currArticle._id == article._id)) {
      this.articles = [...this.articles, article];
      this.model.next(this.articles);
    }
  };
}
