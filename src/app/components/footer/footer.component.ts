import {AfterViewInit, Component, ElementRef, HostListener, Inject, Input, ViewChild} from '@angular/core';
import {faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";
import {NgScrollbar} from "ngx-scrollbar";
import {Subscription} from "rxjs";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit {

  /*Scroll Animations*/
  @Input() scrollbarRef: NgScrollbar;
  @ViewChild('heading', {read: ElementRef}) headingElement;
  @ViewChild('intro_text', {read: ElementRef}) introTextElement;
  @ViewChild('link_container', {read: ElementRef}) linkContainerElement;
  public scrollTops: number[] = new Array<number>(3);
  public isVisible: boolean[] = new Array(3).fill(false);
  /*Icons*/
  public faEnvelope = faEnvelope;
  public faPhone = faPhone;
  private _scrollSubscription = Subscription.EMPTY;

  constructor(@Inject(DOCUMENT) private document: Document) {
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
  onScroll() {
    this.calculateScrollTops();
  }

  public calculateScrollTops(): void {
    /*
    this.scrollTops[0] = this.headingElement.nativeElement.offsetTop + (this.headingElement.nativeElement.scrollHeight / 2);
    this.scrollTops[1] = this.introTextElement.nativeElement.offsetTop + (this.introTextElement.nativeElement.scrollHeight / 2);
    this.scrollTops[2] = this.linkContainerElement.nativeElement.offsetTop + (this.linkContainerElement.nativeElement.scrollHeight / 2);

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
}
