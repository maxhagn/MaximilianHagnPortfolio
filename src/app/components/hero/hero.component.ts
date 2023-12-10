import {AfterViewInit, Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {faLaptopCode} from "@fortawesome/free-solid-svg-icons";
import {NgScrollbar} from "ngx-scrollbar";
import {Subscription} from "rxjs";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements AfterViewInit {

  @Input() scrollbarRef: NgScrollbar;
  private _scrollSubscription = Subscription.EMPTY;

  @ViewChild('left_container', {read: ElementRef}) leftContainerElement;
  @ViewChild('right_container', {read: ElementRef}) rightContainerElement;
  @ViewChild('hello_text', {read: ElementRef}) helloTextElement;
  @ViewChild('name_text', {read: ElementRef}) nameTextElement;
  @ViewChild('catchy_text', {read: ElementRef}) catchyTextElement;
  @ViewChild('detailed_text', {read: ElementRef}) detailedTextElement;
  @ViewChild('mobile_image', {read: ElementRef}) mobileImageElement;

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  public ngAfterViewInit(): void {
    this._scrollSubscription = this.scrollbarRef.verticalScrolled.subscribe(e => {
      this.animate(e)
    });
  }

  public animate(event: any): void {
    const translateSlow = event.target.scrollTop * 2;
    const translateMedium = event.target.scrollTop * 2.25;
    const translateFast = event.target.scrollTop * 2.5;
    this.leftContainerElement.nativeElement.style.transform = `translateX(-${translateFast}px)`;
    this.mobileImageElement.nativeElement.style.transform = `translateX(-${translateFast}px)`;
    this.helloTextElement.nativeElement.style.transform = `translateX(${translateFast}px)`;
    this.nameTextElement.nativeElement.style.transform = `translateX(${translateMedium}px)`;
    this.catchyTextElement.nativeElement.style.transform = `translateX(${translateSlow}px)`;
  }
}
