import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NgScrollbar} from "ngx-scrollbar";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements AfterViewInit {

  @Input() scrollbarRef: NgScrollbar;
  @ViewChild('contact_section', {read: ElementRef}) contactSectionElement;
  @ViewChild('left_container', {read: ElementRef}) leftContainerElement;
  @ViewChild('right_container', {read: ElementRef}) rightContainerElement;
  private _scrollSubscription = Subscription.EMPTY;

  constructor() {
  }

  public ngAfterViewInit(): void {
    this._scrollSubscription = this.scrollbarRef.verticalScrolled.subscribe(e => {
      this.animate(e)
    });
  }

  public animate(event: any): void {
    this.cardsFlyIn(event.target.scrollTop);
  }

  public cardsFlyIn(scrollTop: number): void {
    let relativeChange = scrollTop / this.contactSectionElement.nativeElement.offsetTop;

    let translate = (1 - relativeChange) * 200;

    this.leftContainerElement.nativeElement.style.transform = `translateX(-${translate}px)`;
    this.rightContainerElement.nativeElement.style.transform = `translateX(${translate}px)`;
  }
}
