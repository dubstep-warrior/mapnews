import { Component, Input, OnChanges } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StateService } from 'src/app/core/services/state/state.service';
import { slideInFromLeft, slideInFromRight } from 'src/app/core/utilities/animations';

@Component({
  selector: 'app-navbar',
  animations: [
    slideInFromLeft, slideInFromRight
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnChanges {
  selected = 'Relevant'
  menu = ['Relevant', 'New', 'Favourites', 'MyPost']
  @Input() authenticated: boolean = false;

  constructor(private service: StateService, private authService: AuthService) {

  }

  ngOnChanges(){ 
  }

  addArticle() {
    this.service.addArticle()
  }

  logout() {
    this.authService.logout()
  }
}
