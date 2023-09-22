import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IResponse } from '../../interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.endpoint_mapnews_backend_api;
  }

  private request: (method: string, url: string, data?: any) => Promise<any> =
    async (method, url, data) => {
      const options: any = {
        body: data,
        responseType: 'json',
        observe: 'body',
        headers: {},
      };
      if (method == 'GET' && data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const params = new HttpParams().append('data', JSON.stringify(data));
        options['headers'] = headers;
        options['params'] = params;
      }
      const result = this.http.request(method, url, options);
      return new Promise((resolve, reject) => {
        result.subscribe(resolve, reject);
      }).catch((res) => {
        return res.error;
      });
    };

  get: (args: string, params?: any) => Promise<IResponse> = (
    api,
    params = null,
  ) => {
    return this.request(
      'GET',
      `${this.url}/${api}`,
      params,
    ) as Promise<IResponse>;
  };

  post: (args: string, params: any) => Promise<IResponse> = (api, event) => {
    return this.request(
      'POST',
      `${this.url}/${api}`,
      event,
    ) as Promise<IResponse>;
  };
}
