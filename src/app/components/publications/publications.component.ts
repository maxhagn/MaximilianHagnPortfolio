import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {faEarthEurope, faBook} from "@fortawesome/free-solid-svg-icons";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {Subscription} from "rxjs";
import {NgScrollbar} from "ngx-scrollbar";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit, AfterViewInit {

  @Input() scrollbarRef: NgScrollbar;
  @ViewChild('heading', {read: ElementRef}) headingElement;
  @ViewChild('intro_text', {read: ElementRef}) introTextElement;
  @ViewChild('bachelor_1_heading', {read: ElementRef}) bachelor1HeadingElement;
  @ViewChild('bachelor_1_info', {read: ElementRef}) bachelor1InfoElement;
  @ViewChild('bachelor_1_text_1', {read: ElementRef}) bachelor1Text1Element;
  @ViewChild('bachelor_1_text_2', {read: ElementRef}) bachelor1Text2Element;
  @ViewChild('bachelor_1_link_container', {read: ElementRef}) bachelor1LinkContainerElement;
  @ViewChild('diploma_heading', {read: ElementRef}) diplomaHeadingElement;
  @ViewChild('diploma_info', {read: ElementRef}) diplomaInfoElement;
  @ViewChild('diploma_text_1', {read: ElementRef}) diplomaText1Element;
  @ViewChild('diploma_text_2', {read: ElementRef}) diplomaText2Element;
  @ViewChild('diploma_link_container', {read: ElementRef}) diplomaLinkContainerElement;

  public scrollTops: number[] = new Array<number>(12);
  public isVisible: boolean[] = new Array(12).fill(false);

  private _scrollSubscription = Subscription.EMPTY;

  faEarthEurope = faEarthEurope;
  faGithub = faGithub;
  faBook = faBook;

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    setTimeout(() => {

      this.scrollTops[0] = this.headingElement.nativeElement.offsetTop + (this.headingElement.nativeElement.scrollHeight/2);
      this.scrollTops[1] = this.introTextElement.nativeElement.offsetTop + this.introTextElement.nativeElement.scrollHeight;
      this.scrollTops[2] = this.bachelor1HeadingElement.nativeElement.offsetTop + this.bachelor1HeadingElement.nativeElement.scrollHeight;
      this.scrollTops[3] = this.bachelor1InfoElement.nativeElement.offsetTop + this.bachelor1InfoElement.nativeElement.scrollHeight;
      this.scrollTops[4] = this.bachelor1Text1Element.nativeElement.offsetTop + this.bachelor1Text1Element.nativeElement.scrollHeight;
      this.scrollTops[5] = this.bachelor1Text2Element.nativeElement.offsetTop + this.bachelor1Text2Element.nativeElement.scrollHeight;
      this.scrollTops[6] = this.bachelor1LinkContainerElement.nativeElement.offsetTop + this.bachelor1LinkContainerElement.nativeElement.scrollHeight;
      this.scrollTops[7] = this.diplomaHeadingElement.nativeElement.offsetTop + this.diplomaHeadingElement.nativeElement.scrollHeight;
      this.scrollTops[8] = this.diplomaInfoElement.nativeElement.offsetTop + this.diplomaInfoElement.nativeElement.scrollHeight;
      this.scrollTops[9] = this.diplomaText1Element.nativeElement.offsetTop + this.diplomaText1Element.nativeElement.scrollHeight;
      this.scrollTops[10] = this.diplomaText2Element.nativeElement.offsetTop + this.diplomaText2Element.nativeElement.scrollHeight;
      this.scrollTops[11] = this.diplomaLinkContainerElement.nativeElement.offsetTop + this.diplomaLinkContainerElement.nativeElement.scrollHeight;


      this._scrollSubscription = this.scrollbarRef.verticalScrolled.subscribe(e => {
        this.animate(e)
      });
    }, 1000)
  }

  @HostListener('window:scroll', ['$event'])
  animate(event): void {
    this.scrollTops.forEach((scrollTop, index) => {
      console.log(index + ":" + scrollTop);
      if (event.target.scrollTop + this.document.body.clientHeight > scrollTop) {
        this.isVisible[index] = true;
      }
    })
  }

  public openDiplomaBook(): void {
    window.open('assets/pdf/Creative%20Puzzle%20Webdevelopment%20Class%20Hagn.pdf');
  }
}
