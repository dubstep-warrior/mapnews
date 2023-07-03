import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MapComponent,
    ArticleBoxComponent,
    MarkComponent,
    RightOverlayComponent,
    TagsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMapLibreGLModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
