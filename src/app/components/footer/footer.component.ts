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

  @Input() scrollbarRef: NgScrollbar;
  @ViewChild('heading', {read: ElementRef}) headingElement;
  @ViewChild('intro_text', {read: ElementRef}) introTextElement;
  @ViewChild('link_container', {read: ElementRef}) linkContainerElement;
  private _scrollSubscription = Subscription.EMPTY;

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  public ngAfterViewInit(): void {
    this._scrollSubscription = this.scrollbarRef.verticalScrolled.subscribe(e => {
      this.animate(e)
    });
  }

  public animate(event: any): void {

  }
}
