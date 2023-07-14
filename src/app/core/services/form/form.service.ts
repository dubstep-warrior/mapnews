import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'; 

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
}
