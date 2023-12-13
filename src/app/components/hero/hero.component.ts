import {Component, ElementRef, HostListener, Inject, ViewChild} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  @ViewChild('left_container', {read: ElementRef}) leftContainerElement;
  @ViewChild('right_container', {read: ElementRef}) rightContainerElement;
  @ViewChild('hello_text', {read: ElementRef}) helloTextElement;
  @ViewChild('name_text', {read: ElementRef}) nameTextElement;
  @ViewChild('catchy_text', {read: ElementRef}) catchyTextElement;
  @ViewChild('detailed_text', {read: ElementRef}) detailedTextElement;
  @ViewChild('mobile_image', {read: ElementRef}) mobileImageElement;
  @ViewChild('hero_wrapper', {read: ElementRef}) heroWrapperElement;

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  @HostListener('window:scroll', ['$event'])
  public animate(event: any): void {
    if (window.scrollY < this.heroWrapperElement.nativeElement.scrollHeight) {
      const translateSlow = window.scrollY * 2;
      const translateMedium = window.scrollY * 2.25;
      const translateFast = window.scrollY * 2.5;
      this.leftContainerElement.nativeElement.style.transform = `translateX(-${translateFast}px)`;
      this.mobileImageElement.nativeElement.style.transform = `translateX(-${translateFast}px)`;
      this.helloTextElement.nativeElement.style.transform = `translateX(${translateFast}px)`;
      this.nameTextElement.nativeElement.style.transform = `translateX(${translateMedium}px)`;
      this.catchyTextElement.nativeElement.style.transform = `translateX(${translateSlow}px)`;
    }
  }
}
