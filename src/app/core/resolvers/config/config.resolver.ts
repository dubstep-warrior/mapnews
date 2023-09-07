import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { ConfigResponse, FormService } from '../../services/form/form.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigResolver implements Resolve<ConfigResponse> {
  constructor(private service: FormService) {}

  resolve: (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ) => Promise<ConfigResponse> = async (route, state) => {
    return this.service.init();
  };
}
