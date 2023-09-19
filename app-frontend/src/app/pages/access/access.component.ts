import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { rotate, slider } from 'src/app/core/utilities/animations';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  animations: [slider, rotate],
  styleUrls: ['./access.component.scss'],
})
export class AccessComponent implements AfterViewInit {
  authenticated: boolean = false;
  currentRoute: string;
  constructor(
    private changeRef: ChangeDetectorRef,
    private service: AuthService,
    private router: Router,
  ) {
    this.service.authStatusSubject
      .pipe(takeUntilDestroyed())
      .subscribe((status) => {
        this.authenticated = status.loggedIn;
      });

    this.router.events
      .pipe(
        takeUntilDestroyed(),
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
