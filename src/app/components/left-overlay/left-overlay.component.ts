import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Base } from 'src/app/core/directives/base.directive';
import { LocationService } from 'src/app/core/services/location/location.service';
import { StateService } from 'src/app/core/services/state/state.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-left-overlay',
  templateUrl: './left-overlay.component.html',
  styleUrls: ['./left-overlay.component.scss'],
})
export class LeftOverlayComponent extends Base implements OnInit {
  @Input() state: any;
  @ViewChild('tags') inputTags: any;
  liked: boolean = false;
  currentCoordinates: any;
  currentMouseCoordinates: any;
  locationMouseMode: boolean = false;
  form: FormGroup;

  constructor(
    private stateService: StateService,
    private locationService: LocationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      category: new FormControl(''),
      title: new FormControl(''),
      tags: new FormControl([]),
      location: new FormControl({
        coordinates: []
      }),
      description: new FormControl(''),
      images: new FormControl([])
    })

    this.locationService
      .getLocation()
      .pipe(this.takeUntilDestroy())
      .subscribe((data) => {
        console.log('rep', data);
        this.currentCoordinates = {
          lng: data.coords.longitude,
          lat: data.coords.latitude,
        };
      });

    this.locationService.mouseLocationCoordinates
      .pipe(this.takeUntilDestroy())
      .subscribe((data) => {
        this.currentMouseCoordinates = JSON.parse(data); 
        if (['addArticleLocation'].includes(this.state?.name)) {
          this.form.get('location').setValue({
            coordinates: [this.currentMouseCoordinates.lng, this.currentMouseCoordinates.lat],
          });  
        }
      });
  }

  exitOverlay(): void {
    this.stateService.resetState();
  }

  addTag(event: any) {
    // console.log(event.target.value)
    // console.log(this.state.data.get('tags'))
    this.form
      .get('tags')
      .setValue([...this.state.data.get('tags').value, event.target.value]);
    console.log(this.state.data.get('tags').value);
    this.inputTags.nativeElement.value = '';
  }

  setLoc(type?: String): any {
    if (type && type == 'current') {
      this.form.get('location').setValue({
        coordinates: [this.currentCoordinates.lng, this.currentCoordinates.lat],
      });
    } else {
      this.locationMouseMode = !this.locationMouseMode
      if (this.locationMouseMode) this.stateService.selectArticleLocation();
      else this.stateService.addArticle();
    }
  }
}
