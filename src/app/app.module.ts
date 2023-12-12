import {LOCALE_ID, NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';

import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from "./modules/app-routing.module";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AppComponent} from './app.component';
import {SkillsComponent} from "./components/skills/skills.component";
import {HeroComponent} from "./components/hero/hero.component";
import {ProjectsComponent} from "./components/projects/projects.component";
import {FooterComponent} from './components/footer/footer.component';
import {ContactComponent} from './components/contact/contact.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/data/', '.json');
}

registerLocaleData(localeDe, localeDeExtra);

@NgModule({
  declarations: [
    AppComponent,
    SkillsComponent,
    HeroComponent,
    ProjectsComponent,
    FooterComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
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
