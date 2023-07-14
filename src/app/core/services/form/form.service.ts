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
      publicKey: environment.imagekit_public_key,
      urlEndpoint: environment.imagekit_private_key, //  
      authenticationEndpoint: `${environment.endpoint_mapnews_backend_api}/signature`
  });

    for(let image of images) {
      imagekit.upload({
        file: image.file,
        fileName: image.file.name || "sample-file.jpg", 
        folder: "Articles"
    }, function (err: any, result: any) {
        if (err) {
            alert("Error in file upload. Check console logs for error response");
            console.log(err);
        } else {
            alert("File uploaded. Check console logs for success response");
            console.log(result);
        }
    })
    }
  }

}
