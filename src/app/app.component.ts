import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {NgScrollbar} from "ngx-scrollbar";
import {DOCUMENT} from "@angular/common";
import {filter} from "rxjs/operators";
import {NavigationEnd, Router} from "@angular/router";
import {faBars, faXmark} from "@fortawesome/free-solid-svg-icons";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(NgScrollbar, {static: true}) scrollbarRef: NgScrollbar;

  @ViewChild('landing', {read: ElementRef}) landingElement;
  @ViewChild('publications', {read: ElementRef}) publicationsElement;
  @ViewChild('projects', {read: ElementRef}) projectsElement;
  @ViewChild('cv', {read: ElementRef}) cvElement;
  @ViewChild('contact', {read: ElementRef}) contactElement;
  @ViewChild('footer', {read: ElementRef}) footerElement;

  public navbarDisplay: string;
  public opacityClass: string;
  public isMenuCollapsed: boolean;
  public activeMenuEntry: number;
  public currentComponent: string;

  public faBars = faBars;
  public faXmark = faXmark;

  public languageList = [
    {code: 'en', label: 'English'},
    {code: 'de', label: 'German'}
  ];

  constructor(public translate: TranslateService, @Inject(DOCUMENT) private document: Document, private router: Router) {
    this.translate.setDefaultLang('en');
    this.translate.use('en')
    this.currentComponent = "Our System"
    this.isMenuCollapsed = true;
  }

  ngOnInit(): void {
    this.navbarDisplay = "1";
    this.opacityClass = 'navbar navbar-expand-lg navbar-light align-items-end';
    this.currentComponent = "Our System"
    this.isMenuCollapsed = true;
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.getRoute();
    });
  }

  public changeLang(lang: string): void {
    this.translate.use(lang);
  }

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }


  styleNavbar(): string {
    return this.opacityClass;
  }

  public toggleNav() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  private getRoute(): void {
    this.isMenuCollapsed = true;
    const currentUri = this.router.url;
    if (currentUri === "/") {
      this.activeMenuEntry = 1;
    } else if (currentUri === "/publications") {
      this.activeMenuEntry = 2;
    } else if (currentUri === "/project") {
      this.activeMenuEntry = 3;
    } else if (currentUri === "/cv") {
      this.activeMenuEntry = 4;
    } else if (currentUri === "/contact") {
      this.activeMenuEntry = 5;
    }
  }

}
