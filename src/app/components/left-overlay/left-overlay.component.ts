import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Base } from 'src/app/core/directives/base.directive';
import { LocationService } from 'src/app/core/services/location/location.service';
import { StateService } from 'src/app/core/services/state/state.service';
import { FormGroup, FormControl } from '@angular/forms';
import { FormService } from 'src/app/core/services/form/form.service';
import { ArticleService } from 'src/app/core/services/article/article.service';
import { bounce, slideIn } from 'src/app/core/utilities/animations';

@Component({
  selector: 'app-left-overlay',
  animations: [bounce, slideIn],
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
  animationState = false;
  form: FormGroup;

  constructor(
    private stateService: StateService,
    private articleService: ArticleService,
    private locationService: LocationService,
    private formService: FormService
  ) {
    super();
  }

  ngOnInit(): void {
    this.form = this.formService.resolve('addArticle');

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
            coordinates: [
              this.currentMouseCoordinates.lng,
              this.currentMouseCoordinates.lat,
            ],
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
      .setValue([...this.form.get('tags').value, event.target.value]);
    console.log(this.form.get('tags').value);
    this.inputTags.nativeElement.value = '';
  }

  setLoc(type?: String): any {
    if (type && type == 'current') {
      this.form.get('location').setValue({
        coordinates: [this.currentCoordinates.lng, this.currentCoordinates.lat],
      });
    } else {
      this.locationMouseMode = !this.locationMouseMode;
      if (this.locationMouseMode) this.stateService.selectArticleLocation();
      else this.stateService.addArticle();
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
    const res = await this.articleService.report(this.form);
    console.log(res);
  }

  resetState(): any {
    this.formService.resetForm();
    this.stateService.resetState();
  }
}
