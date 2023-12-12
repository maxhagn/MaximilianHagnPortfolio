import {AfterViewInit, Component, ElementRef, HostListener, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {NgScrollbar} from "ngx-scrollbar";
import {DOCUMENT} from "@angular/common";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {ProjectDto} from "../../models/ProjectDto";
import {ProjectService} from "../../services/project.service";
import {Language} from "../../models/Language";
import {TextDto} from "../../models/TextDto";
import {ProjectStats} from "../../models/ProjectStats";
import {HyperlinkDto} from "../../models/HyperlinkDto";
import {DeviconService} from "../../services/devicon.service";
import {SkillStats} from "../../models/SkillStats";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  @Input() scrollbarRef: NgScrollbar;
  @ViewChild('project_box', {read: ElementRef}) projectBoxElement;
  public currentLanguage: string = "en";
  public projects: ProjectDto[];
  public projectStats: ProjectStats;
  public loadingStats: boolean = true;
  public loadingProjects: boolean = true;
  public Language = Language;
  public displayProjectStats: ProjectStats = {
    totalWorkdays: 0,
    totalWebsites: 0,
    totalRepositories: 0,
    clientCount: 0,
    projectCount: 0
  };

  public colors = ['']
  //public colors = [
  //  'bg-gray-400 text-black',
   // 'bg-gray-500 text-gray-900',
    //'bg-gray-600 text-gray-800'];

  constructor(private translate: TranslateService, @Inject(DOCUMENT) private document: Document, private projectService: ProjectService, private deviconService: DeviconService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    });
  }

  ngOnInit(): void {
    this.getProjects();
    this.getProjectStats();
  }

  @HostListener('window:scroll', ['$event'])
  public animate(event: any): void {
    this.setProjectStatsScroll();
  }

  public setProjectStatsScroll() {
    if (this.projectBoxElement) {
      const position = this.projectBoxElement.nativeElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (position.top < windowHeight && position.bottom >= 0) {
        const relative = Math.min(1, (windowHeight - position.top) / 400)
        this.displayProjectStats.totalRepositories = Math.floor(this.projectStats.totalRepositories * relative)
        this.displayProjectStats.totalWebsites = Math.floor(this.projectStats.totalWebsites * relative)
        this.displayProjectStats.totalWorkdays = Math.floor(this.projectStats.totalWorkdays * relative)
        this.displayProjectStats.projectCount = Math.floor(this.projectStats.projectCount * relative)
        this.displayProjectStats.clientCount = Math.floor(this.projectStats.clientCount * relative)
      }
    }
  }

  getProjectStats(): void {
    this.projectService.getProjectStats().subscribe(
      (projectStats: ProjectStats) => {
        this.projectStats = projectStats;
        this.displayProjectStats = {...projectStats};
        this.loadingStats = false;
      }
    );
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
        this.loadingProjects = false;
      }
    );
  }

  getTextInLanguage(textDto: TextDto[], language: Language): string {
    return textDto?.find(text => text.language === language)?.content || '';
  }

  getGitHubRepo(hyperlinkDto: HyperlinkDto[]): HyperlinkDto {
    return hyperlinkDto?.find(hyperlink => hyperlink.description === 'GitHub Repository' && hyperlink.active === true);
  }

  getWebsite(hyperlinkDto: HyperlinkDto[]): HyperlinkDto {
    return hyperlinkDto?.find(hyperlink => hyperlink.description === 'Website' && hyperlink.active === true);
  }

  getDocuments(hyperlinkDto: HyperlinkDto[]): HyperlinkDto {
    return hyperlinkDto?.find(hyperlink => hyperlink.description !== 'Website' && hyperlink.description !== 'GitHub Repository' && hyperlink.active === true);
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
      3: 'col-span-4',
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
