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
export class ConfigResolver implements Resolve<void> {
  constructor(private service: FormService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<void> {
    return this.service.init();
  }
}
