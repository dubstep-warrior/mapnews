import { Injectable } from '@angular/core';
import { Article } from './../../interfaces/article';
import { Subject } from 'rxjs';
import { State } from './../../interfaces/state' 

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() {  
  } 

  state: State = {name: "neutral"}; 
  model: Subject<any> = new Subject();  

  resolveState(stateName: State['name'], data?: any) {
    this.state.name = stateName
    this.state.data = data
    this.stateBroadcast()
  }

  private stateBroadcast() {
    this.model.next(this.state)
  }

  resetState() {
    console.log('reset state called')
    this.state = {name: "neutral"}
    this.stateBroadcast()
  }
}
