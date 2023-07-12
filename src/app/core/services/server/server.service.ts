import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: {},
    });
    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    }).catch(() => {
      return { success: false };
    });
  }

  getNewsArticles(): any {
    return this.request('GET', `${this.url}/api/v1/articles`);
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