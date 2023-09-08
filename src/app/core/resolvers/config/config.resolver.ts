import { Injectable } from '@angular/core';
import { ConfigResponse, FormService } from '../../services/form/form.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigResolver {
  constructor(private service: FormService) {}

  resolve: () => Promise<ConfigResponse> = async () => {
    return this.service.init();
  };
}
