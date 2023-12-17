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
export class AppComponent implements OnInit{

  @ViewChild('hero', {read: ElementRef}) heroElement;
  @ViewChild('projects_link', {read: ElementRef}) projectsElement;
  @ViewChild('skills', {read: ElementRef}) skillsElement;
  @ViewChild('contact', {read: ElementRef}) contactElement;
  @ViewChild('header', {read: ElementRef}) headerElement;
  @ViewChild('dummy_box', {read: ElementRef}) dummyBoxElement;
  @ViewChild('headerInner', {read: ElementRef}) headerInnerElement;
  public activeMenuEntry: number;
  public isLanguageChanged: boolean = false;
  public isLoaded: boolean;
  public isMenuCollapsed: boolean;
  public projects: Array<ProjectDto>;
  public currentProject: ProjectDto;
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

  public colors = ['']
  //public colors = [
  //  'bg-gray-400 text-black',
  // 'bg-gray-500 text-gray-900',
  //'bg-gray-600 text-gray-800'];


  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: any) {
    if (window.scrollY + this.document.body.clientHeight < (this.projectsElement.nativeElement.offsetTop + 100)) {
      this.activeMenuEntry = 1;
    } else if (window.scrollY + this.document.body.clientHeight >= this.projectsElement.nativeElement.offsetTop &&
      window.scrollY + this.document.body.clientHeight < this.skillsElement.nativeElement.offsetTop) {
      this.activeMenuEntry = 2;
    } else if (window.scrollY + this.document.body.clientHeight >= this.skillsElement.nativeElement.offsetTop &&
      window.scrollY + this.document.body.clientHeight < this.contactElement.nativeElement.offsetTop) {
      this.activeMenuEntry = 3;
    } else if (window.scrollY + this.document.body.clientHeight >= this.skillsElement.nativeElement.offsetTop) {
      this.activeMenuEntry = 5;
    }
    if (window.scrollY > this.projectsElement.nativeElement.offsetTop + 100) {
      this.dummyBoxElement.nativeElement.style.flexBasis = '0'
      this.headerElement.nativeElement.style.backgroundColor = 'rgb(17 24 39 / 1)'
    }

    this.setHeaderCss(window.scrollY)
  }

  public setHeaderCss(scrollTop: number): void {
    let relativeChange = scrollTop / this.projectsElement.nativeElement.offsetTop;
    relativeChange = relativeChange < 1 ? relativeChange : 1;

    let flexBasisDummyBox = (1 - relativeChange) * 50;
    let maxWithHeaderInner = (window.innerWidth / 16) + (80 - (window.innerWidth / 16)) * relativeChange
    this.headerInnerElement.nativeElement.style.maxWidth = maxWithHeaderInner + 'rem'
    this.dummyBoxElement.nativeElement.style.flexBasis = flexBasisDummyBox + '%';

    if (scrollTop > this.projectsElement.nativeElement.offsetTop) {
      this.headerElement.nativeElement.style.backgroundColor = 'rgb(17 24 39 / 1)'
    } else {
      this.headerElement.nativeElement.style.background = 'none'
    }
  }

  onOpenOverlay(project: ProjectDto) {
    this.currentProject = project;

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
        this.projects = projects.filter(project =>
          project.shortDescription &&
          project.shortDescription.some(text =>
            text.content !== "" && text.language === Language.ENGLISH)
        );
        this.assignGridClasses();
      }
    );
  }

  assignGridClasses() {
    this.projects.forEach((project, index) => {
      if (index < 6) {
        project.gridClass = this.getGridClass(3)
      } else if (index < 12) {
        project.gridClass = this.getGridClass(1);
      } else {
        project.gridClass = this.getGridClass(1);
      }
    });
    this.shuffleArray(this.projects)
  }

  getGridClass(units: number): string {
    const combinations = {
      3: 'col-span-2',
      2: 'col-span-2',
      1: 'col-span-2'
    };

    return combinations[units] + ' ' + this.getRandomColor();
  }

  getRandomColor(): string {
    const randomNumber = Math.floor(Math.random() * this.colors.length);
    return this.colors[randomNumber];
  }

  shuffleArray(array: any[]): any[] {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

}
