import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {DeviceDetectorService} from "ngx-device-detector";

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

  constructor(private deviceService: DeviceDetectorService) {
  }

  @HostListener('window:scroll', ['$event'])
  public animate(): void {
    if (window.scrollY < this.heroWrapperElement.nativeElement.scrollHeight && this.deviceService.isDesktop()) {
      const translateSlow = Math.max(0, window.scrollY * 2);
      const translateMedium = Math.max(0, window.scrollY * 2.25);
      const translateFast = Math.max(0, window.scrollY * 2.5);
      this.leftContainerElement.nativeElement.style.transform = `translateX(-${translateFast}px)`;
      this.mobileImageElement.nativeElement.style.transform = `translateX(-${translateFast}px)`;
      this.helloTextElement.nativeElement.style.transform = `translateX(${translateFast}px)`;
      this.nameTextElement.nativeElement.style.transform = `translateX(${translateMedium}px)`;
      this.catchyTextElement.nativeElement.style.transform = `translateX(${translateSlow}px)`;
    }
  }
}
