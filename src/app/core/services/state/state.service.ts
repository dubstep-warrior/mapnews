import { Injectable } from '@angular/core';
import { Article } from './../../interfaces/article';
import { Subject } from 'rxjs';
import { State } from './../../interfaces/state';
import { WebSocketService } from '../ws/web-socket.service';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor(private wsService: WebSocketService) {}
  prevState: State;
  state: State = { name: 'neutral' };
  model: Subject<any> = new Subject();

  resolveState(stateName: State['name'], data?: any) {
    this.state = {
      name: stateName,
    };
    this.state.data = data;
    this.wsService.send(this.state);
    this.stateBroadcast();
  }

  private stateBroadcast() {
    this.model.next(this.state);
  }

  resetState() {
    this.state = { name: 'neutral' };
    this.stateBroadcast();
  }
}
