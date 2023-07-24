import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.endpoint_mapnews_backend_api;
  }

  private async request(method: string, url: string, data?: any) {
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
    console.log(url);
    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    }).catch(() => {
      return { success: false };
    });
  }

  get(api: string, params: any = null): any {
    return this.request('GET', `${this.url}/${api}`, params);
  }

  post(api: string, event: any): any {
    return this.request('POST', `${this.url}/${api}`, event);
  }

  // getProducts(): any {
  //   return this.request('GET', `${this.url}/product`);
  // }

  // getProduct(event: any): any {
  //   return this.request(
  //     'GET',
  //     `${this.url}/product/search/${event.bSN}/${event.upc}`
  //   );
  // }

  // addProduct(event: any) {
  //   return this.request('POST', `${this.url}/product/add-product`, event);
  // }

  // getStock(event: any) {
  //   return this.request('GET', `${this.url}/inventory/search/${event.upc}`);
  // }

  // addStock(event: any) {
  //   return this.request('POST', `${this.url}/inventory/add-stock`, event);
  // }

  // processSale(event: any) {
  //   return this.request('POST', `${this.url}/sales`, event);
  // }

  // processStocktake(event: any) {
  //   return this.request('POST', `${this.url}/stocktake`, event);
  // }

  // getReport(): any {
  //   return this.request('GET', `${this.url}/stocktake/report`);
  // }
}
