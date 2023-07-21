import { Component, OnInit, ViewChild } from '@angular/core';
import { bounce, slideIn } from 'src/app/core/utilities/animations';
import { FormDirective } from 'src/app/core/directives/form.directive';

@Component({
  selector: 'app-left-overlay',
  animations: [bounce, slideIn],
  templateUrl: './left-overlay.component.html',
  styleUrls: ['./left-overlay.component.scss'],
})
export class LeftOverlayComponent extends FormDirective implements OnInit {
  @ViewChild('tags') inputTags: any;
  currentCoordinates: any; 
  locationMouseMode: boolean = false;
 
  constructor() {
    super();
    this.formType = 'addArticle'
  }

  override ngOnInit(): void {
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
        if (['addArticleLocation'].includes(this.state?.name)) {
          this.form.get('location').setValue({
            coordinates: [
              JSON.parse(data).lng,
              JSON.parse(data).lat,
            ],
          }); 
        }
      });

      super.ngOnInit();
  }

  exitOverlay(): void {
    this.stateService.resetState();
  }
 

  setLoc(type?: String): any {
    if (type && type == 'current') {
      this.form.get('location').setValue({
        coordinates: [this.currentCoordinates.lng, this.currentCoordinates.lat],
      });
    } else {
      this.locationMouseMode = !this.locationMouseMode;
      if (this.locationMouseMode) this.stateService.resolveState('addArticleLocation');
      else this.stateService.resolveState('addArticle');
    }
  }

  imageDropHandler(event: any) {
    event.preventDefault();
    this.form.get('images').setValue([
      ...this.form.get('images').value,
      ...[...event.dataTransfer.files].map((data) => {
        return {
          file: data,
          preview_uri: URL.createObjectURL(data as Blob),
        };
      }),
    ]);
    console.log(this.form.get('images').value);
  }

  addImage(event: any) {
    this.imageDropHandler({
      dataTransfer: {
        files: [event.target.files[0]],
      },
      preventDefault: () => {
        return;
      },
    });
  }

  async submit(): Promise<void> {

    console.log('submit called')
    const res = await this.articleService.report(this.form);
    console.log(res);
  }

  resetState(): any {
    this.formService.resetForm();
    this.stateService.resetState();
  }
}
