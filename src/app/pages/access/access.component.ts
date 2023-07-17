import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fader, slider } from 'src/app/core/utilities/animations';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  animations: [ 
    slider
  ],
  styleUrls: ['./access.component.scss']
})
export class AccessComponent implements AfterViewInit {

  constructor(private changeRef: ChangeDetectorRef){}

  ngAfterViewInit(): void {
    this.changeRef.detectChanges();
 }

  prepareRoute(outlet: RouterOutlet) { 
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
