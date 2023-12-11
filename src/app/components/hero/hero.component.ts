import {AfterViewInit, Component, ElementRef, Inject, Input, ViewChild} from '@angular/core';
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
  @ViewChild('left_container', {read: ElementRef}) leftContainerElement;
  @ViewChild('right_container', {read: ElementRef}) rightContainerElement;
  @ViewChild('hello_text', {read: ElementRef}) helloTextElement;
  @ViewChild('name_text', {read: ElementRef}) nameTextElement;
  @ViewChild('catchy_text', {read: ElementRef}) catchyTextElement;
  @ViewChild('detailed_text', {read: ElementRef}) detailedTextElement;
  @ViewChild('mobile_image', {read: ElementRef}) mobileImageElement;
  @ViewChild('hero_wrapper', {read: ElementRef}) heroWrapperElement;
  private _scrollSubscription = Subscription.EMPTY;

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  public ngAfterViewInit(): void {
    this._scrollSubscription = this.scrollbarRef.verticalScrolled.subscribe(e => {
      this.animate(e)
    });
  }

  public animate(event: any): void {
    if (event.target.scrollTop < this.heroWrapperElement.nativeElement.scrollHeight) {
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
}
