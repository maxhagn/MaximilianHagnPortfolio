import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {ProjectDto} from "../../models/ProjectDto";
import {ProjectService} from "../../services/project.service";
import {Language} from "../../models/Language";
import {TextDto} from "../../models/TextDto";
import {ProjectStats} from "../../models/ProjectStats";
import {HyperlinkDto} from "../../models/HyperlinkDto";
import {DeviceDetectorService} from "ngx-device-detector";

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
  public blacklist = [document.querySelector("a")]
  public displayProjectStats: ProjectStats = {
    totalWorkdays: 0,
    totalWebsites: 0,
    totalRepositories: 0,
    clientCount: 0,
    projectCount: 0
  };
  protected readonly event = event;
  protected readonly window = window;

  constructor(private translate: TranslateService, private deviceService: DeviceDetectorService, private projectService: ProjectService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    });
  }

  openOverlay(event: any, project: ProjectDto) {
    if (this.blacklist.includes(event.target)) {
      console.log("clicked")
      return;
    }
    this.overlayProject.emit(project);
  }

  ngOnInit(): void {
    this.getProjectStats();
  }

  @HostListener('window:scroll', ['$event'])
  public animate(): void {
    this.setProjectStatsScroll();
  }

  public setProjectStatsScroll() {
    if (this.projectBoxElement && this.deviceService.isDesktop()) {
      const position = this.projectBoxElement.nativeElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (position.top < windowHeight && position.bottom >= 0 && this.deviceService.isDesktop()) {
        const relativeNumbers = Math.min(1, (windowHeight - position.top - 100) / 600);
        const relativeScale = Math.max(Math.min(1, (windowHeight - position.top - 100) / 600), .75);
        this.projectBoxElement.nativeElement.style.opacity = relativeScale;
        this.projectBoxElement.nativeElement.style.transform = `scale(${relativeScale})`;
        this.displayProjectStats.totalRepositories = Math.floor(this.projectStats.totalRepositories * relativeNumbers)
        this.displayProjectStats.totalWebsites = Math.floor(this.projectStats.totalWebsites * relativeNumbers)
        this.displayProjectStats.totalWorkdays = Math.floor(this.projectStats.totalWorkdays * relativeNumbers)
        this.displayProjectStats.projectCount = Math.floor(this.projectStats.projectCount * relativeNumbers)
        this.displayProjectStats.clientCount = Math.floor(this.projectStats.clientCount * relativeNumbers)
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

  getThumbnail(hyperlinkDto: HyperlinkDto[]): HyperlinkDto {
    return hyperlinkDto?.find(hyperlink => hyperlink.description === 'Thumbnail' && hyperlink.active === true);
  }

  getTextInLanguage(textDto: TextDto[]): string {
    if (this.currentLanguage == "de") {
      return textDto?.find(text => text.language === Language.GERMAN)?.content || '';
    } else {
      return textDto?.find(text => text.language === Language.ENGLISH)?.content || '';
    }
  }

  getGitHubRepo(hyperlinkDto: HyperlinkDto[]): HyperlinkDto {
    return hyperlinkDto?.find(hyperlink => hyperlink.description === 'GitHub Repository' && hyperlink.active === true);
  }

  getWebsite(hyperlinkDto: HyperlinkDto[]): HyperlinkDto {
    return hyperlinkDto?.find(hyperlink => hyperlink.description === 'Website' && hyperlink.active === true);
  }

  getDocuments(hyperlinkDto: HyperlinkDto[]): HyperlinkDto {
    return hyperlinkDto?.find(hyperlink => hyperlink.description !== 'Website' && hyperlink.description !== 'GitHub Repository' && !hyperlink.description.startsWith('Image') && hyperlink.active === true);
  }
}
