import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
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

  @ViewChild('project_box', {read: ElementRef}) projectBoxElement;
  public currentLanguage: string = "en";
  @Input() projects: Array<ProjectDto>;
  @Output() overlayProject: EventEmitter<ProjectDto> = new EventEmitter();
  public projectStats: ProjectStats;
  public loadingStats: boolean = true;
  public Language = Language;
  public displayProjectStats: ProjectStats = {
    totalWorkdays: 0,
    totalWebsites: 0,
    totalRepositories: 0,
    clientCount: 0,
    projectCount: 0
  };

  openOverlay(project: ProjectDto) {
    this.overlayProject.emit(project);
  }

  constructor(private translate: TranslateService, @Inject(DOCUMENT) private document: Document, private projectService: ProjectService, private deviconService: DeviconService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    });
  }

  ngOnInit(): void {
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
        const relative = Math.min(1, (windowHeight - position.top -100 ) / 600)
        console.log(relative)
        this.projectBoxElement.nativeElement.style.opacity = relative;
        this.projectBoxElement.nativeElement.style.transform = `scale(${relative})`;
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
}
