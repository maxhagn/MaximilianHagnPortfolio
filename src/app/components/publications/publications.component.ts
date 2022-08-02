import {Component, ElementRef, HostListener, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {faEarthEurope, faBook} from "@fortawesome/free-solid-svg-icons";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {Subscription} from "rxjs";
import {NgScrollbar} from "ngx-scrollbar";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {

  @Input() scrollbarRef: NgScrollbar;

  @ViewChild('heading', {read: ElementRef}) headingElement;
  @ViewChild('intro_text', {read: ElementRef}) introTextElement;

  public headingElementScrollTop: number;
  public introTextElementScrollTop: number;

  public headingElementIsVisible: boolean;
  public introTextElementIsVisible: boolean;

  private _scrollSubscription = Subscription.EMPTY;

  faEarthEurope = faEarthEurope;
  faGithub = faGithub;
  faBook = faBook;

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.headingElementScrollTop = this.headingElement.nativeElement.offsetTop + this.headingElement.nativeElement.scrollHeight;
    this.introTextElementScrollTop = this.introTextElement.nativeElement.offsetTop + this.introTextElement.nativeElement.scrollHeight;

    this._scrollSubscription = this.scrollbarRef.verticalScrolled.subscribe(e => {
      this.animate(e)
    });
  }

  @HostListener('window:scroll', ['$event'])
  animate(event): void {
    console.log(event.target.scrollTop + this.document.body.clientHeight);

    if (event.target.scrollTop + this.document.body.clientHeight > this.headingElementScrollTop) {
      this.headingElementIsVisible = true;
    }
    if (event.target.scrollTop + this.document.body.clientHeight > this.introTextElementScrollTop) {
      this.introTextElementIsVisible = true;
    }

  }

}
