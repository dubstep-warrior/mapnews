import { Component, Input } from '@angular/core';
import { StateService } from 'src/app/core/services/state/state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  selected = 'Relevant'
  menu = ['Relevant', 'New']
  @Input() authenticated: boolean = false;

  constructor(private service: StateService) {

  }

  addArticle() {
    this.service.addArticle()
  }
}
