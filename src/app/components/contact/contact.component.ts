import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {DeviceDetectorService} from "ngx-device-detector";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  @ViewChild('contact_section', {read: ElementRef}) contactSectionElement;
  @ViewChild('left_container', {read: ElementRef}) leftContainerElement;
  @ViewChild('right_container', {read: ElementRef}) rightContainerElement;

  constructor(private deviceService: DeviceDetectorService) {
  }

  @HostListener('window:scroll', ['$event'])
  public animate(event: any): void {
    this.cardsFlyIn();
  }

  public cardsFlyIn(): void {
    if (window.scrollY > this.contactSectionElement.nativeElement.scrollHeight && this.deviceService.isDesktop()) {
      let relativeChange = window.scrollY / this.contactSectionElement.nativeElement.offsetTop;
      let translate = (1 - relativeChange) * 500;
      this.leftContainerElement.nativeElement.style.transform = `translateX(-${translate}px)`;
      this.rightContainerElement.nativeElement.style.transform = `translateX(${translate}px)`;
    }
  }
}
