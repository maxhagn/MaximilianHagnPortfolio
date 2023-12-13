import {Component, ElementRef, HostListener, Inject, ViewChild} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  @ViewChild('heading', {read: ElementRef}) headingElement;
  @ViewChild('intro_text', {read: ElementRef}) introTextElement;
  @ViewChild('link_container', {read: ElementRef}) linkContainerElement;

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  @HostListener('window:scroll', ['$event'])
  public animate(event: any): void {

  }
}
