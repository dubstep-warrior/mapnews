import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { State, StateName } from '../../interfaces/state.interface';
import { WebSocketService } from '../ws/web-socket.service';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor(private wsService: WebSocketService) {}
  prevState: State;
  state: State = { name: 'neutral' };
  model: Subject<any> = new Subject();

  resolveState: (args: StateName, params?: any) => void = (stateName, data) => {
    this.state = {
      name: stateName,
    };
    this.state.data = data;
    this.stateBroadcast();
  };

  private stateBroadcast: () => void = () => {
    this.wsService.send(this.state);
    this.model.next(this.state);
  };

  resetState: () => void = () => {
    this.state = { name: 'neutral' };
    this.stateBroadcast();
  };
}
