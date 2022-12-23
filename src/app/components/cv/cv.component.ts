import {AfterViewInit, Component, ElementRef, HostListener, Inject, Input, ViewChild} from '@angular/core';
import {faEnvelope, faHouse, faInfo, faPhone, faUsersViewfinder} from "@fortawesome/free-solid-svg-icons";
import {NgScrollbar} from "ngx-scrollbar";
import {Subscription} from "rxjs";
import {DOCUMENT} from "@angular/common";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements AfterViewInit {

  /*Scroll Animations*/
  @Input() scrollbarRef: NgScrollbar;
  @ViewChild('heading', {read: ElementRef}) headingElement;
  @ViewChild('name', {read: ElementRef}) nameElement;
  @ViewChild('link_container', {read: ElementRef}) linkContainerElement;
  @ViewChild('personal_data', {read: ElementRef}) personalDataElement;
  @ViewChild('education', {read: ElementRef}) educationElement;
  @ViewChild('employment', {read: ElementRef}) employmentElement;
  @ViewChild('recognitions', {read: ElementRef}) recognitionsElement;
  @ViewChild('languages', {read: ElementRef}) languagesElement;
  @ViewChild('skills', {read: ElementRef}) skillsElement;
  public scrollTops: number[] = new Array<number>(9);
  public isVisible: boolean[] = new Array(9).fill(false);
  /*Icons*/
  public faPhone = faPhone;
  public faEnvelope = faEnvelope;
  public faHouse = faHouse;
  public faUsersViewfinder = faUsersViewfinder
  public faInfo = faInfo;
  /*Skills Detailed View*/
  public isDetailedView: boolean;
  private _scrollSubscription = Subscription.EMPTY;

  public currentLanguage: string = "en";

  constructor(private translate: TranslateService, @Inject(DOCUMENT) private document: Document) {
    this.isDetailedView = false;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    });
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.calculateScrollTops();
      this._scrollSubscription = this.scrollbarRef.verticalScrolled.subscribe(e => {
        this.animate(e)
      });
    }, 1000)
  }

  @HostListener('window:resize', ['$event'])
  onResizeEvent() {
    this.calculateScrollTops();
  }

  public calculateScrollTops(): void {
    this.scrollTops[0] = this.headingElement.nativeElement.offsetTop + (this.headingElement.nativeElement.scrollHeight / 2);
    this.scrollTops[1] = this.nameElement.nativeElement.offsetTop + (this.nameElement.nativeElement.scrollHeight / 2);
    this.scrollTops[2] = this.linkContainerElement.nativeElement.offsetTop + (this.linkContainerElement.nativeElement.scrollHeight / 2);
    /*

    this.scrollTops[3] = this.personalDataElement.nativeElement.offsetTop + (this.personalDataElement.nativeElement.scrollHeight / 2);
    this.scrollTops[4] = this.educationElement.nativeElement.offsetTop + (this.educationElement.nativeElement.scrollHeight / 2);
    this.scrollTops[5] = this.employmentElement.nativeElement.offsetTop + (this.employmentElement.nativeElement.scrollHeight / 2);
    this.scrollTops[6] = this.recognitionsElement.nativeElement.offsetTop + (this.recognitionsElement.nativeElement.scrollHeight / 2);
    this.scrollTops[7] = this.languagesElement.nativeElement.offsetTop + (this.languagesElement.nativeElement.scrollHeight / 2);
    this.scrollTops[8] = this.skillsElement.nativeElement.offsetTop + (this.skillsElement.nativeElement.scrollHeight / 2);
    */

  }

  public animate(event): void {
    if (event.target.scrollTop + this.document.body.clientHeight > this.scrollTops[0] - 100) {
      this.calculateScrollTops();
    }
    this.scrollTops.forEach((scrollTop, index) => {
      if (event.target.scrollTop + this.document.body.clientHeight > scrollTop) {
        this.isVisible[index] = true;
      }
    })
  }

  public setDetailed(flag: boolean): void {
    this.isDetailedView = flag;
  }

  ngOnInit(): void {
  }

}
