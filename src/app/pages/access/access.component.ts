import { animate, style, transition, trigger } from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Base } from 'src/app/core/directives/base.directive';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { rotate, slider } from 'src/app/core/utilities/animations';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  animations: [slider, rotate],
  styleUrls: ['./access.component.scss'],
})
export class AccessComponent extends Base implements OnInit, AfterViewInit {
  authenticated: boolean = false;
  currentRoute: string;
  constructor(
    private changeRef: ChangeDetectorRef,
    private service: AuthService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.service.authStatusSubject
      .pipe(this.takeUntilDestroy())
      .subscribe((status) => {
        this.authenticated = status.loggedIn;
      });

    this.router.events
      .pipe(
        this.takeUntilDestroy(),
        filter((event) => event instanceof NavigationEnd),
      )
      .subscribe((event) => {
        const strArr = (event as NavigationEnd)['url'].split('/');
        this.currentRoute = strArr[strArr.length - 1];
      });
  }

  ngAfterViewInit(): void {
    this.changeRef.detectChanges();
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  resetState() {
    this.router.navigate(['/']);
  }
}
