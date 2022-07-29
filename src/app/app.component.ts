import {Component, ElementRef, HostListener, Inject, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
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
  @ViewChild('contact', {read: ElementRef}) contactElement;
  private _scrollSubscription = Subscription.EMPTY;
  public transformBox: number;
  public navbarColor: string;
  public navbarDisplay: string;
  public opacityClass: string;
  isMenuCollapsed: boolean;
  activeMenuEntry: number;
  currentComponent: string;
  faBars = faBars;
  faXmark = faXmark;

  title = 'Ang10-NGX-translate';

  languageList = [
    {code: 'en', label: 'English'},
    {code: 'de', label: 'German'}
  ];

  changeLang(lang: string) {
    this.translate.use(lang);
  }

  constructor(public translate: TranslateService, @Inject(DOCUMENT) private document: Document, private router: Router) {
    this.translate.setDefaultLang('en');
    this.translate.use('en')
    this.currentComponent = "Our System"
    this.isMenuCollapsed = true;
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      this.getRoute();
    });
  }

  ngOnInit(): void {
    this.navbarDisplay = "1";
    this.opacityClass = 'navbar navbar-expand-lg navbar-light align-items-end';
    this.currentComponent = "Our System"
    this.isMenuCollapsed = true;
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      this.getRoute();
    });
  }

  ngAfterViewInit(): void {
    this._scrollSubscription = this.scrollbarRef.verticalScrolled.subscribe(e => {
      this.setScrollAnimations(e)
    });
  }

  @HostListener('window:scroll', ['$event'])
  async setScrollAnimations(event) {
    console.log(event.target.scrollTop)
    console.log(window.innerHeight)
    if (event.target.scrollTop > 100 && event.target.scrollTop < window.innerHeight) {
      this.opacityClass = 'navbar navbar-expand-lg navbar-light align-items-end opacity-none';
      this.navbarColor = 'rgb(68,70,82)';
    } else if (event.target.scrollTop >= window.innerHeight && event.target.scrollTop < this.contactElement.nativeElement.offsetTop - 60) {
      this.navbarColor = 'rgb(68,70,82)';
      this.opacityClass = 'navbar navbar-expand-lg navbar-light align-items-end';
    } else {
      this.navbarColor = 'rgb(255,255,255)';
      this.opacityClass = 'navbar navbar-expand-lg navbar-light align-items-end';
    }
    this.transformBox = - event.target.scrollTop / (window.innerHeight/2) * 50;

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
