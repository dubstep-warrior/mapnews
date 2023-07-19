import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ServerService } from '../services/server/server.service';
import { FormService } from '../services/form/form.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigResolver implements Resolve<boolean> {

  constructor(private formService: FormService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.formService.retrieveFormConfig();
  }
}
