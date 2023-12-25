import {Component, ElementRef, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {TranslateService} from "@ngx-translate/core";
import {ProjectDto} from "./models/ProjectDto";
import {ProjectService} from "./services/project.service";
import {Language} from "./models/Language";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('hero', {read: ElementRef}) heroElement;
  @ViewChild('projects_link', {read: ElementRef}) projectsElement;
  @ViewChild('skills', {read: ElementRef}) skillsElement;
  @ViewChild('contact', {read: ElementRef}) contactElement;
  @ViewChild('header', {read: ElementRef}) headerElement;
  @ViewChild('dummy_box', {read: ElementRef}) dummyBoxElement;
  @ViewChild('headerInner', {read: ElementRef}) headerInnerElement;
  public activeMenuEntry: number = 1;
  public isLanguageChanged: boolean = false;
  public isLoaded: boolean;
  public isMenuCollapsed: boolean;
  public projects: Array<ProjectDto>;
  public currentProject: ProjectDto;
  public colors = ['']
  public languageList = [
    {code: 'en', label: 'English'},
    {code: 'de', label: 'German'}
  ];

  ngOnInit() {
    this.getProjects()
  }

  constructor(public translate: TranslateService, @Inject(DOCUMENT) private document: Document, private projectService: ProjectService) {
    this.translate.setDefaultLang('en');
    this.translate.use('en')
    this.isMenuCollapsed = true;
    this.isLoaded = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth >= 1024) {
      this.isMenuCollapsed = true;
      this.setHeaderCss();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (window.scrollY < (this.projectsElement.nativeElement.offsetTop)) {
      this.activeMenuEntry = 1;
    } else if (window.scrollY >= this.projectsElement.nativeElement.offsetTop &&
      window.scrollY < this.skillsElement.nativeElement.offsetTop) {
      this.activeMenuEntry = 2;
    } else if (window.scrollY >= this.skillsElement.nativeElement.offsetTop &&
      window.scrollY < this.contactElement.nativeElement.offsetTop -300 ) {
      this.activeMenuEntry = 3;
    } else {
      this.activeMenuEntry = 4;
    }

    this.setHeaderCss()
  }

  public setHeaderCss(): void {
    let relativeChange = window.scrollY / this.projectsElement.nativeElement.offsetTop;
    relativeChange = relativeChange * 2 < 1 ? relativeChange * 2 : 1;

    let flexBasisDummyBox = Math.min((1 - relativeChange) * 50, 50);
    let maxWithHeaderInner = (window.innerWidth / 16) + (80 - (window.innerWidth / 16)) * relativeChange
    this.headerInnerElement.nativeElement.style.maxWidth = maxWithHeaderInner + 'rem'
    this.dummyBoxElement.nativeElement.style.flexBasis = flexBasisDummyBox + '%';

    if (window.innerWidth < 1024 || window.scrollY > this.projectsElement.nativeElement.offsetTop) {
      this.headerElement.nativeElement.style.backgroundColor = 'rgb(17 24 39 / 1)'
    } else {
      this.headerElement.nativeElement.style.background = 'none'
    }
  }

  onOpenOverlay(project: ProjectDto) {
    this.currentProject = project;

    if (this.currentProject) {
      document.documentElement.style.overflowY = 'hidden';
      this.headerElement.nativeElement.style.zIndex = '-1';
    } else {
      document.documentElement.style.overflowY = 'auto';
      this.headerElement.nativeElement.style.zIndex = '100';
    }
  }

  public changeLang(lang: string): void {
    this.isLanguageChanged = true;
    this.translate.use(lang);
  }

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  public toggleNav() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe(
      (projects: ProjectDto[]) => {
        this.projects = projects.sort((a, b) => {
          const aHasThumbnail = a.links?.some(link => link.description === 'Thumbnail');
          const bHasThumbnail = b.links?.some(link => link.description === 'Thumbnail');
          if (aHasThumbnail && !bHasThumbnail) {
            return -1;
          }
          if (!aHasThumbnail && bHasThumbnail) {
            return 1;
          }
          return (b.relevanceScore ?? 0) - (a.relevanceScore ?? 0);
        });
        this.assignGridClasses();
      }
    );
  }

  assignGridClasses() {
    this.projects.forEach((project, index) => {
      if (index < 12) {
        project.gridClass = this.getGridClass(2)
      } else {
        project.gridClass = this.getGridClass(1);
      }
    });
  }

  getGridClass(units: number): string {
    const combinations = {
      2: 'col-span-2',
      1: 'col-span-1'
    };

    return combinations[units] + ' ' + this.getRandomColor();
  }

  getRandomColor(): string {
    const randomNumber = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomNumber];
  }
}
