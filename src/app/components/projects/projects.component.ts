import {AfterViewInit, Component, ElementRef, HostListener, Inject, Input, ViewChild} from '@angular/core';
import {Project} from "../../models/project";
import projects from '../../../assets/data/projects.json';
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {faEarthEurope, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {Keyword} from "../../models/keyword";
import {NgScrollbar} from "ngx-scrollbar";
import {Subscription} from "rxjs";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements AfterViewInit {

  /*Scroll Animations*/
  @Input() scrollbarRef: NgScrollbar;
  @ViewChild('heading', {read: ElementRef}) headingElement;
  @ViewChild('intro_text', {read: ElementRef}) introTextElement;
  @ViewChild('search_button', {read: ElementRef}) searchButtonElement;
  @ViewChild('project_container', {read: ElementRef}) projectContainerElement;
  public scrollTops: number[] = new Array<number>(4);
  public isVisible: boolean[] = new Array(4).fill(false);
  /*Icons*/
  faGithub = faGithub;
  faBrowser = faEarthEurope;
  faMagnifyingGlass = faMagnifyingGlass;
  public projects: Project[] = projects;
  public currentSelectedProjects: Project[];
  public currentLanguage: string = "en";
  public currentSelect: Keyword;
  public selectableTags: Keyword[] =
    [
      {tag: "Top"},
      {tag: "Angular"},
      {tag: "Blender"},
      {tag: "C"},
      {tag: "C++"},
      {tag: "CSS"},
      {tag: "Flex"},
      {tag: "Java"},
      {tag: "Java Spring Boot"},
      {tag: "JavaScript"},
      {tag: "LLVM"},
      {tag: "Matlab"},
      {tag: "MPI"},
      {tag: "OpenMP"},
      {tag: "R Studio"},
      {tag: "Security"},
      {tag: "University"},
      {tag: "Websites"},
      {tag: "Yacc/Bison"}
    ];
  private _scrollSubscription = Subscription.EMPTY;

  constructor(private translate: TranslateService, @Inject(DOCUMENT) private document: Document) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    });
    this.changeSelectedProjects(this.selectableTags[0]);
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.calculateScrollTops();
      this._scrollSubscription = this.scrollbarRef.verticalScrolled.subscribe(e => {
        this.animate(e)
      });
    }, 1000)
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.calculateScrollTops();
  }

  public calculateScrollTops(): void {
    this.scrollTops[0] = this.headingElement.nativeElement.offsetTop + (this.headingElement.nativeElement.scrollHeight / 2);
    this.scrollTops[1] = this.introTextElement.nativeElement.offsetTop + (this.introTextElement.nativeElement.scrollHeight / 2);
    this.scrollTops[2] = this.searchButtonElement.nativeElement.offsetTop + (this.searchButtonElement.nativeElement.scrollHeight / 2);
    this.scrollTops[3] = this.projectContainerElement.nativeElement.offsetTop + 100;
  }

  public animate(event): void {
    this.scrollTops.forEach((scrollTop, index) => {
      if (event.target.scrollTop + this.document.body.clientHeight > scrollTop) {
        this.isVisible[index] = true;
      }
    })
  }

  public changeSelectedProjects(tag: Keyword): void {
    this.currentSelect = tag;
    this.currentSelectedProjects = this.projects.filter(x => x.keywords.some(g => this.currentSelect.tag.includes(g.tag)));
  }
}
