import { Component, OnInit, ViewChild } from '@angular/core';
import { bounce, slideIn } from 'src/app/core/utilities/animations';
import { FormDirective } from 'src/app/core/directives/form.directive';
import { ILocation } from 'src/app/core/interfaces/location.interface';

@Component({
  selector: 'app-left-overlay',
  animations: [bounce, slideIn],
  templateUrl: './left-overlay.component.html',
  styleUrls: ['./left-overlay.component.scss'],
})
export class LeftOverlayComponent extends FormDirective implements OnInit {
  locationMouseMode: boolean = false;

  constructor() {
    super();
    this.formType = 'addArticle';
  }

  override ngOnInit(): void {
    this.locationService.mouseLocationCoordinates
      .pipe(this.takeUntilDestroy())
      .subscribe((data: ILocation) => {
        if (['addArticleLocation'].includes(this.state?.name)) {
          this.form.get('location').setValue({
            coordinates: [data.longitude, data.latitude],
          });
        }
      });

    super.ngOnInit();
  }

  exitOverlay(): void {
    this.stateService.resetState();
  }

  setLoc(type?: string): void {
    if (type && type == 'current') {
      this.form.get('location').setValue({
        coordinates: [
          this.locationService.currentLocation.longitude,
          this.locationService.currentLocation.latitude,
        ],
      });
    } else {
      this.locationMouseMode = !this.locationMouseMode;
      if (this.locationMouseMode)
        this.stateService.resolveState('addArticleLocation');
      else this.stateService.resolveState('addArticle');
    }
  }

  imageDropHandler(event: any) {
    event.preventDefault();
    this.form.get('images').setValue([
      ...this.form.get('images').value,
      ...[...event.dataTransfer.files].map((data: File) => {
        return {
          file: data,
          preview_uri: URL.createObjectURL(data as Blob),
        };
      }),
    ]);
  }

  addImage(event: Event) {
    this.imageDropHandler({
      dataTransfer: {
        files: [(event.target as HTMLInputElement).files[0]],
      },
      preventDefault: () => {
        return;
      },
    });
  }

  async submit(): Promise<void> {
    await this.articleService.report(this.form);
  }

  resetState(): void {
    this.formService.resetForm();
    this.stateService.resetState();
  }
}
