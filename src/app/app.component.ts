import {AfterViewInit, Component, ElementRef, HostListener, Inject, ViewChild} from '@angular/core';
import {NgScrollbar} from "ngx-scrollbar";
import {DOCUMENT} from "@angular/common";
import {faBars, faXmark} from "@fortawesome/free-solid-svg-icons";
import {TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs";

declare function initCanvas(): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  /*Scroll Animations*/
  @ViewChild(NgScrollbar, {static: true}) scrollbarRef: NgScrollbar;
  @ViewChild('landing', {read: ElementRef}) landingElement;
  @ViewChild('about', {read: ElementRef}) aboutElement;
  @ViewChild('publications', {read: ElementRef}) publicationsElement;
  @ViewChild('projects', {read: ElementRef}) projectsElement;
  @ViewChild('cv', {read: ElementRef}) cvElement;
  @ViewChild('contact', {read: ElementRef}) contactElement;
  @ViewChild('footer', {read: ElementRef}) footerElement;
  public activeMenuEntry: number;
  public isLanguageChanged: boolean = false;
  public isLoaded: boolean;
  /*Mobile Navbar*/
  public isMenuCollapsed: boolean;
  /*Icons*/
  public faBars = faBars;
  public faXmark = faXmark;
  /*Languages*/
  public languageList = [
    {code: 'en', label: 'English'},
    {code: 'de', label: 'German'}
  ];
  private _scrollSubscription = Subscription.EMPTY;

  constructor(public translate: TranslateService, @Inject(DOCUMENT) private document: Document) {
    this.translate.setDefaultLang('en');
    this.translate.use('en')
    this.isMenuCollapsed = true;
    this.isLoaded = false;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._scrollSubscription = this.scrollbarRef.verticalScrolled.subscribe(e => {
        this.getActiveSection(e)
      });
    }, 1000)
    initCanvas();
    this.sleep();
  }

  @HostListener('window:scroll', ['$event'])
  public getActiveSection(event): void {
    if (event.target.scrollTop + this.document.body.clientHeight < (this.aboutElement.nativeElement.offsetTop + 100)) {
      this.activeMenuEntry = 1;
    } else if (event.target.scrollTop + this.document.body.clientHeight >= (this.aboutElement.nativeElement.offsetTop + 100) &&
      event.target.scrollTop + this.document.body.clientHeight < this.publicationsElement.nativeElement.offsetTop) {
      this.activeMenuEntry = 2;
    } else if (event.target.scrollTop + this.document.body.clientHeight >= this.publicationsElement.nativeElement.offsetTop &&
      event.target.scrollTop + this.document.body.clientHeight < this.projectsElement.nativeElement.offsetTop) {
      this.activeMenuEntry = 3;
    } else if (event.target.scrollTop + this.document.body.clientHeight >= this.projectsElement.nativeElement.offsetTop &&
      event.target.scrollTop + this.document.body.clientHeight < this.cvElement.nativeElement.offsetTop) {
      this.activeMenuEntry = 4;
    } else if (event.target.scrollTop + this.document.body.clientHeight >= this.cvElement.nativeElement.offsetTop &&
      event.target.scrollTop + this.document.body.clientHeight < this.contactElement.nativeElement.offsetTop) {
      this.activeMenuEntry = 5;
    } else if (event.target.scrollTop + this.document.body.clientHeight >= this.contactElement.nativeElement.offsetTop) {
      this.activeMenuEntry = 6;
    }
  }

  public changeLang(lang: string): void {
    this.isLanguageChanged = true;
    this.translate.use(lang);
  }

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  public toggleNav() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  async sleep() {
    setTimeout(() => {
      this.isLoaded = true;
    }, 1000)
    initCanvas();
  }
}
