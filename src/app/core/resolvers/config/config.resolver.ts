import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs'; 
import { FormService } from '../../services/form/form.service'; 

@Injectable({
  providedIn: 'root',
})
export class ConfigResolver implements Resolve<boolean> {
  constructor(
    private service: FormService, 
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.service.init();
  }
}
