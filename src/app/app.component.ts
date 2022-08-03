import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {NgScrollbar} from "ngx-scrollbar";
import {DOCUMENT} from "@angular/common";
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
  @ViewChild('about', {read: ElementRef}) aboutElement;
  @ViewChild('publications', {read: ElementRef}) publicationsElement;
  @ViewChild('projects', {read: ElementRef}) projectsElement;
  @ViewChild('cv', {read: ElementRef}) cvElement;
  @ViewChild('contact', {read: ElementRef}) contactElement;
  @ViewChild('footer', {read: ElementRef}) footerElement;

  public isMenuCollapsed: boolean;
  public activeMenuEntry: number;

  public faBars = faBars;
  public faXmark = faXmark;

  public languageList = [
    {code: 'en', label: 'English'},
    {code: 'de', label: 'German'}
  ];

  constructor(public translate: TranslateService, @Inject(DOCUMENT) private document: Document) {
    this.translate.setDefaultLang('en');
    this.translate.use('en')
    this.isMenuCollapsed = true;
  }

  ngOnInit(): void {
    this.isMenuCollapsed = true;
  }

  public changeLang(lang: string): void {
    this.translate.use(lang);
  }

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  public toggleNav() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

}
