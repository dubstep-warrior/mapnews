import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MapComponent } from './components/map/map.component';
import { NgxMapLibreGLModule } from '@maplibre/ngx-maplibre-gl';
import { ArticleBoxComponent } from './components/article-box/article-box.component';
import { MarkComponent } from './components/mark/mark.component';
import { RightOverlayComponent } from './components/right-overlay/right-overlay.component';
import { TagsComponent } from './components/tags/tags.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LeftOverlayComponent } from './components/left-overlay/left-overlay.component';
import { MultiItemCarouselComponent } from './components/multi-item-carousel/multi-item-carousel.component';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AccessComponent } from './pages/access/access.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from './core/interceptors/auth/auth.interceptor';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { FormDirective } from './core/directives/form.directive';
import { ArticleDetailsComponent } from './components/article-details/article-details.component';
import { RightOverlayContainerComponent } from './components/shared/right-overlay-container/right-overlay-container.component';
import { AccessContainerComponent } from './components/shared/access-container/access-container.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { NotificationMessagePipe } from './core/pipes/notification-message/notification-message.pipe';
import { LikeTermPipe } from './core/pipes/like-term/like-term.pipe';
import { EmailNamePipe } from './core/pipes/email-name/email-name.pipe';
import { CustomTimePipe } from './core/pipes/custom-time/custom-time.pipe';
import { DatePipe } from '@angular/common';
import { IntlRelativeTimePipe } from 'angular-ecmascript-intl';

export let AppInjector: Injector;
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MapComponent,
    ArticleBoxComponent,
    MarkComponent,
    RightOverlayComponent,
    TagsComponent,
    LeftOverlayComponent,
    MultiItemCarouselComponent,
    ImageGalleryComponent,
    HomeComponent,
    LoginComponent,
    AccessComponent,
    RegisterComponent,
    ArticleFormComponent,
    FormDirective,
    ArticleDetailsComponent,
    RightOverlayContainerComponent,
    AccessContainerComponent,
    NotificationsComponent,
    NotificationMessagePipe,
    LikeTermPipe,
    EmailNamePipe,
    CustomTimePipe,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgxMapLibreGLModule,
    BrowserAnimationsModule,
    CarouselModule,
    GalleriaModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    DatePipe,
    IntlRelativeTimePipe,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor(private injector: Injector) {
    AppInjector = this.injector;
  }
}
