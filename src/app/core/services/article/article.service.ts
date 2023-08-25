import { Injectable } from '@angular/core';
import { ServerService } from '../server/server.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { StateService } from '../state/state.service';
import { FormGroup } from '@angular/forms';
import { FormService } from '../form/form.service';
import { Article, GetArticleParams } from '../../interfaces/article';
import { LocationService } from '../location/location.service';
import { WebSocketService } from '../ws/web-socket.service';
import { AuthService } from '../auth/auth.service';
import { AuthStatus } from '../../interfaces/auth';

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
    private formService: FormService,
    private authService: AuthService,
    private stateService: StateService,
    private locationService: LocationService,
    private wsService: WebSocketService,
  ) {
    this.model = new BehaviorSubject([]);
    console.log('BEGIN', navigator.geolocation);
    this.authService.authStatusSubject.pipe().subscribe((status) => {
      this.authStatus = status;
    });
  }

  async getArticles(key: string, params?: GetArticleParams) {
    this.current = key == 'current' ? this.current : key;
    console.log('YES WE ARE');
    console.log('GETTING ARTICLES', {
      ...this.locationService.currentLocation,
      ...params,
    });
    const res = await this.service.get(
      `${this.api}${this.navMapping[this.current]}`,
      { ...this.locationService.currentLocation, ...params },
    );
    console.log(res);
    if (res && res.success) {
      this.articles = res.data;
      this.model.next(this.articles);
      if (!!params) {
        console.log('sending out searched articles');
        this.wsService.send({
          name: 'searchedArticles',
          data: params,
        });
      }
    } else {
      console.log(res.error);
    }
    return res;
  }

  async report(form: FormGroup) {
    let formData = new FormData();
    Object.keys(form.value).forEach((key) => {
      if ((form.value as any)[key]) {
        if (key == 'images') {
          (form.value as any)[key].forEach((image: any) => {
            formData.append(key, image.file);
          });
        } else {
          formData.append(key, JSON.stringify((form.value as any)[key]));
        }
      }
    });
    this.stateService.resolveState('submittingArticle');
    const res = await this.service.post(this.api, formData);
    if (res && res.success) {
      this.model.next([...this.articles, res.data]);
      this.wsService.send({
        name: 'postedArticle',
        data: res.data,
      });
    }
    this.stateService.resolveState('submitAttempted', { success: res.success });
    return res;
  }

  async resolveArticleLikes(id: string) {
    const res = await this.service.post(`${this.api}/like`, { articleId: id });
    console.log(res);
    if (res && res.success) {
      console.log('inside success');
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
  }

  addNotificationArticle: (arg: Article) => void = (article) => {
    if (!this.articles.some((currArticle) => currArticle._id == article._id)) {
      this.articles = [...this.articles, article];
      this.model.next(this.articles);
    }
  };
}
