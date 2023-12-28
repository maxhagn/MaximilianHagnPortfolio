import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProjectDto} from "../../models/ProjectDto";
import {Language} from "../../models/Language";
import {TextDto} from "../../models/TextDto";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {HyperlinkDto} from "../../models/HyperlinkDto";
import {LangChangeEvent, TranslateModule, TranslateService} from "@ngx-translate/core";
import {SkillCategory} from "../../models/SkillCategory";
import {SkillDto} from "../../models/SkillDto";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    NgbTooltip,
    TranslateModule
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {

  @Input() project: ProjectDto;
  @Input() header: any;
  @Output() overlayProject: EventEmitter<ProjectDto> = new EventEmitter();
  @ViewChild('overlay', {read: ElementRef}) overlayElement;
  skillGroups: { category: SkillCategory, skills: SkillDto[] }[] = [];
  public currentLanguage: string = "en";
  currentImageIndex: number = 0;
  animationFinished: boolean = false;
  hasVisiteLinks: boolean = false;
  hasImages: boolean = false;
  images: HyperlinkDto[] = null;
  links: HyperlinkDto[] = null;
  isLoading: boolean = true;
  protected readonly Language = Language;
  protected readonly Math = Math;

  constructor(private translate: TranslateService) {
    this.currentLanguage = this.translate.currentLang;
  }

  ngOnInit() {
    this.images = this.filterImages(this.project.links);
    this.links = this.filterLinks(this.project.links);
    this.hasVisiteLinks = this.links && this.links.length > 0;
    this.hasImages = this.images && this.images.length > 0;
    this.skillGroups = this.groupSkills();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    });
    setTimeout(() => {
      this.animationFinished = true;
    }, 500);
  }

  getOverlay() {
    return this.overlayElement.nativeElement;
  }

  filterImages(hyperlinks: HyperlinkDto[]): HyperlinkDto[] {
    if (!hyperlinks) {
      return null;
    }

    const images = hyperlinks.filter(hyperlink => hyperlink.description.startsWith("Image"));
    const thumbnails = hyperlinks.filter(hyperlink => hyperlink.description.startsWith("Thumbnail"));

    if (images.length === 0 && thumbnails.length === 0) {
      return null;
    }

    images.sort((a, b) => a.description.localeCompare(b.description));

    if (thumbnails.length === 0) {
      return images;
    }

    const thumbnailExists = images.find(hyperlink => hyperlink.url === thumbnails[0].url);
    if (!thumbnailExists) {
      images.unshift(thumbnails[0]);
    }
    return images;
  }

  filterLinks(hyperlinks: HyperlinkDto[]): HyperlinkDto[] {
    if (hyperlinks) {
      let visiteLinks = hyperlinks.filter(hyperlink =>
        ["GitHub", "Website", "Document", "Book"].some(prefix => hyperlink.description.startsWith(prefix))
      );
      return visiteLinks.sort((a, b) => a.description.localeCompare(b.description));
    }
  }

  groupSkills() {
    const groupMap = new Map<SkillCategory, SkillDto[]>();
    for (const skill of this.project.skills) {
      if (!groupMap.has(skill.skillCategory)) {
        groupMap.set(skill.skillCategory, []);
      }
      groupMap.get(skill.skillCategory).push(skill);
    }
    return Array.from(groupMap, ([category, skills]) => ({category, skills}));
  }

  snakeCaseToNormal(string: string): string {
    return string
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  getContentByLanguage(textDto: TextDto[]): string {
    if (this.currentLanguage == "de") {
      return textDto?.find(text => text.language === Language.GERMAN)?.content || '';
    } else {
      return textDto?.find(text => text.language === Language.ENGLISH)?.content || '';
    }
  }
}
