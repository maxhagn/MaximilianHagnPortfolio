import {Component, Inject, Input, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  @Input() scrollbarRef: NgScrollbar;
  public currentLanguage: string = "en";
  public projects: ProjectDto[];
  public projectStats: ProjectStats;
  public loadingStats: boolean = true;
  public loadingProjects: boolean = true;
  public Language = Language;
  public colors = [
    'bg-gray-900 text-gray-400',
    'bg-gray-700 text-gray-300',
    'bg-gray-500 text-gray-100'];

  constructor(private translate: TranslateService, @Inject(DOCUMENT) private document: Document, private projectService: ProjectService, private deviconService: DeviconService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    });
  }

  ngOnInit(): void {
    this.getProjects();
    this.getProjectStats();
  }

  getProjectStats(): void {
    this.projectService.getProjectStats().subscribe(
      (projectStats: ProjectStats) => {
        this.projectStats = projectStats;
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
        project.gridClass = this.getGridClass(2)
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
      3: 'col-span-6',
      2: 'col-span-4',
      1: 'col-span-4'
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
