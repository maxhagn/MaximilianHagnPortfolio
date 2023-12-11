import {AfterViewInit, Component, ElementRef, HostListener, Inject, ViewChild} from '@angular/core';
import {NgScrollbar} from "ngx-scrollbar";
import {DOCUMENT} from "@angular/common";
import {faBars, faXmark} from "@fortawesome/free-solid-svg-icons";
import {TranslateService} from "@ngx-translate/core";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  /*Scroll Animations*/
  @ViewChild(NgScrollbar, {static: true}) scrollbarRef: NgScrollbar;
  @ViewChild('hero', {read: ElementRef}) heroElement;
  @ViewChild('projects', {read: ElementRef}) projectsElement;
  @ViewChild('skills', {read: ElementRef}) skillsElement;
  @ViewChild('contact', {read: ElementRef}) contactElement;
  @ViewChild('header', {read: ElementRef}) headerElement;
  @ViewChild('dummy_box', {read: ElementRef}) dummyBoxElement;
  @ViewChild('headerInner', {read: ElementRef}) headerInnerElement;
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
    this._scrollSubscription = this.scrollbarRef.verticalScrolled.subscribe(e => {
      this.getActiveSection(e)
    });
  }

  @HostListener('window:scroll', ['$event'])
  public getActiveSection(event): void {
    if (event.target.scrollTop + this.document.body.clientHeight < (this.projectsElement.nativeElement.offsetTop + 100)) {
      this.activeMenuEntry = 1;
    } else if (event.target.scrollTop + this.document.body.clientHeight >= this.projectsElement.nativeElement.offsetTop &&
      event.target.scrollTop + this.document.body.clientHeight < this.skillsElement.nativeElement.offsetTop) {
      this.activeMenuEntry = 2;
    } else if (event.target.scrollTop + this.document.body.clientHeight >= this.skillsElement.nativeElement.offsetTop &&
      event.target.scrollTop + this.document.body.clientHeight < this.contactElement.nativeElement.offsetTop) {
      this.activeMenuEntry = 3;
    } else if (event.target.scrollTop + this.document.body.clientHeight >= this.skillsElement.nativeElement.offsetTop) {
      this.activeMenuEntry = 5;
    }
    if (event.target.scrollTop > this.projectsElement.nativeElement.offsetTop + 100) {
      this.dummyBoxElement.nativeElement.style.flexBasis = '0'
      this.headerElement.nativeElement.style.backgroundColor = 'rgb(17 24 39 / 1)'
    }

    this.setHeaderCss(event.target.scrollTop)
  }

  public setHeaderCss(scrollTop: number): void {
    let relativeChange = scrollTop / this.projectsElement.nativeElement.offsetTop;
    relativeChange = relativeChange < 1 ? relativeChange : 1;

    let flexBasisDummyBox = (1 - relativeChange) * 50;
    let maxWithHeaderInner = (window.innerWidth / 16) + (80 - (window.innerWidth / 16)) * relativeChange
    this.headerInnerElement.nativeElement.style.maxWidth = maxWithHeaderInner + 'rem'
    this.dummyBoxElement.nativeElement.style.flexBasis = flexBasisDummyBox + '%';

    if (scrollTop > this.projectsElement.nativeElement.offsetTop) {
      this.headerElement.nativeElement.style.backgroundColor = 'rgb(17 24 39 / 1)'
    } else {
      this.headerElement.nativeElement.style.background = 'none'
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
}
