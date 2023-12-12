import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {NgScrollbar} from "ngx-scrollbar";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  @Input() scrollbarRef: NgScrollbar;
  @ViewChild('contact_section', {read: ElementRef}) contactSectionElement;
  @ViewChild('left_container', {read: ElementRef}) leftContainerElement;
  @ViewChild('right_container', {read: ElementRef}) rightContainerElement;

  constructor() {
  }

  @HostListener('window:scroll', ['$event'])
  public animate(event: any): void {
    this.cardsFlyIn();
  }

  public cardsFlyIn(): void {
    let relativeChange = window.scrollY / this.contactSectionElement.nativeElement.offsetTop;

    let translate = (1 - relativeChange) * 500;

    this.leftContainerElement.nativeElement.style.transform = `translateX(-${translate}px)`;
    this.rightContainerElement.nativeElement.style.transform = `translateX(${translate}px)`;
  }
}
