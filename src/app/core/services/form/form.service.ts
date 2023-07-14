import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import ImageKit from "imagekit-javascript"
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  addArticleForm: FormGroup;
  constructor() { 
    this.addArticleForm = new FormGroup({
      category: new FormControl(''),
      title: new FormControl(''),
      tags: new FormControl([]),
      location: new FormControl({
        coordinates: []
      }),
      description: new FormControl(''),
      images: new FormControl([])
    })
  }

  async uploadToImageKit(images: any) {
    const imagekit = new ImageKit({
      publicKey: "your_public_key",
      urlEndpoint: "your_url_endpoint", //  
      authenticationEndpoint: `${environment.endpoint_mapnews_backend_api}/signature`
  });
  }

}
