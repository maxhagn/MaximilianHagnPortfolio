import {LOCALE_ID, NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';

import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from "./modules/app-routing.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AppComponent} from './app.component';
import {CvComponent} from "./components/cv/cv.component";
import {LandingComponent} from "./components/landing/landing.component";
import {ProjectsComponent} from "./components/projects/projects.component";
import {PublicationsComponent} from "./components/publications/publications.component";
import {ContactComponent} from './components/contact/contact.component';
import {NgScrollbarModule} from "ngx-scrollbar";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/data/', '.json');
}

registerLocaleData(localeDe, localeDeExtra);

@NgModule({
  declarations: [
    AppComponent,
    CvComponent,
    LandingComponent,
    ProjectsComponent,
    PublicationsComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    NgScrollbarModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'en',
    })
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: LOCALE_ID, useValue: "de"}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
