import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProjectDto} from "../../models/ProjectDto";
import {Language} from "../../models/Language";
import {TextDto} from "../../models/TextDto";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {HyperlinkDto} from "../../models/HyperlinkDto";
import {LangChangeEvent, TranslateModule, TranslateService} from "@ngx-translate/core";

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
  @Output() overlayProject: EventEmitter<ProjectDto> = new EventEmitter();

  public currentLanguage: string = "en";
  currentImageIndex: number = 0;
  hasVisiteLinks: boolean = false;
  images: HyperlinkDto[];
  links: HyperlinkDto[];

  constructor(private translate: TranslateService) {
    this.currentLanguage = this.translate.currentLang;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    });
  }

  ngOnInit() {
    this.images = this.filterImages(this.project.links);
    this.links = this.filterLinks(this.project.links);
    this.hasVisiteLinks = this.links.length > 0;
  }

  filterImages(hyperlinks: HyperlinkDto[]): HyperlinkDto[] {
    const filteredHyperlinks = hyperlinks.filter(hyperlink => hyperlink.description.startsWith("Image"));
    const thumbnails = hyperlinks.filter(hyperlink => hyperlink.description.startsWith("Thumbnail"));
    filteredHyperlinks.sort((a, b) => a.description.localeCompare(b.description));
    filteredHyperlinks.unshift(thumbnails[0]);
    return filteredHyperlinks;
  }

  filterLinks(hyperlinks: HyperlinkDto[]): HyperlinkDto[] {
    const prefixes = ["API", "GitHub", "Github", "Website", "Document", "Book"];
    return hyperlinks.filter(hyperlink =>
      prefixes.some(prefix => hyperlink.description.startsWith(prefix))
    );
  }

  closeOverlay() {
    this.overlayProject.emit(null);
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

  protected readonly Language = Language;
  protected readonly Math = Math;
}
