import {Directive, ElementRef, EventEmitter, Output} from '@angular/core';

@Directive({
  selector: '[appInViewport]',
  standalone: true
})
export class InViewportDirective {
  public viewportClass1: string = "animate__animated";
  public viewportClass2: string = "animate__fadeIn";
  @Output() inViewport = new EventEmitter<boolean>();
  private observer: IntersectionObserver;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const isInViewport = entry.isIntersecting;
        this.inViewport.emit(isInViewport);

        if (this.viewportClass1 && this.viewportClass2) {
          if (isInViewport) {
            this.el.nativeElement.classList.add(this.viewportClass1);
            this.el.nativeElement.classList.add(this.viewportClass2);
          } else {
            this.el.nativeElement.classList.remove(this.viewportClass1);
            this.el.nativeElement.classList.remove(this.viewportClass2);
          }
        }
      });
    });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

}
