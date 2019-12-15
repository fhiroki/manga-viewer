import { SeriesComponent } from './series/series.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BookComponent } from './book/book.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdcImageListModule } from '@angular-mdc/web'
import { FlexLayoutModule } from '@angular/flex-layout';
import { ImageViewerModule } from './image-viewer/image-viewer.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SeriesComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MdcImageListModule,
    FlexLayoutModule,
    ImageViewerModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
