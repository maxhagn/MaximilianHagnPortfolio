import {AfterViewInit, Component, ElementRef, HostListener, Inject, Input, ViewChild} from '@angular/core';
import {NgScrollbar} from "ngx-scrollbar";
import {DOCUMENT} from "@angular/common";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit {

  /*Scroll Animations*/
  @Input() scrollbarRef: NgScrollbar;
  @ViewChild('footer', {read: ElementRef}) footerElement;
  public scrollTops: number[] = new Array<number>(3);
  public isVisible: boolean[] = new Array(3).fill(false);
  private _scrollSubscription = Subscription.EMPTY;

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.calculateScrollTops();
      this._scrollSubscription = this.scrollbarRef.verticalScrolled.subscribe(e => {
        this.animate(e)
      });
    }, 1000)
  }

  public animate(event): void {
    if (event.target.scrollTop + this.document.body.clientHeight > this.scrollTops[0] - 100) {
      this.calculateScrollTops();
    }
    this.scrollTops.forEach((scrollTop, index) => {
      this.isVisible[index] = event.target.scrollTop + this.document.body.clientHeight > scrollTop;
    })
  }

  @HostListener('window:resize', ['$event'])
  public onResizeEvent(): void {
    this.calculateScrollTops();
  }

  public calculateScrollTops(): void {
    this.scrollTops[0] = this.footerElement.nativeElement.offsetTop + (this.footerElement.nativeElement.scrollHeight / 2);
  }
}
