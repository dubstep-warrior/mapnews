import { Injectable } from '@angular/core';
import { ServerService } from '../server/server.service';
import { Subject } from 'rxjs';
import { StateService } from '../state/state.service';
import { FormGroup } from '@angular/forms';
import { FormService } from '../form/form.service';
import { Article } from '../../interfaces/article';
import { LocationService } from '../location/location.service';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  model: Subject<any>;
  api: string = 'api/v1/article';
  location: any;
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
    private stateService: StateService,
    private locationService: LocationService
  ) {
    this.model = new Subject();
    this.locationService.getLocation().subscribe(data => {
      this.location = {
        longtitude: data.longitude,
        latitude: data.latitude,
      }
    })

    
    console.log('BEGIN', navigator.geolocation)
    if (navigator.geolocation) {
      
      navigator.geolocation.getCurrentPosition((data) => {
        console.log('yes exist', data)
        this.location = {
          longtitude: data.coords.longitude,
          latitude: data.coords.latitude,
        };

        this.getArticles();
      });
    }
  }

  async getArticles(key: string = 'relevant', params: any = this.location) {
    console.log('GETTING ARTICLES', key, params)
    const res = await this.service.get(
      `${this.api}${this.navMapping[key]}`,
      params,
    );
    console.log(res);
    if (res && res.success) {
      this.model.next({
        type: 'articles',
        state: key,
        data: res.data,
      });
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
      this.model.next({
        type: 'article',
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
      this.model.next({
        type: 'update',
        data: res.data,
      });

      if (this.stateService.state.name == 'articleDetails') {
        this.stateService.model.next({
          name: this.stateService.state.name,
          data: res.data,
        });
      }
    }
  }
}
