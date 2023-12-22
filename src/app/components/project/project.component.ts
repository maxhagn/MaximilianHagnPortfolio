import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProjectDto} from "../../models/ProjectDto";
import {Language} from "../../models/Language";
import {TextDto} from "../../models/TextDto";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {HyperlinkDto} from "../../models/HyperlinkDto";
import {filterToMembersWithDecorator} from "@angular/compiler-cli/src/ngtsc/reflection";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    NgbTooltip
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {

  @Input() project: ProjectDto;
  @Output() overlayProject: EventEmitter<ProjectDto> = new EventEmitter();

  currentImageIndex: number = 0;
  images: HyperlinkDto[];

  ngOnInit() {
    this.images = this.filterHyperlinks(this.project.links);
  }

  filterHyperlinks(hyperlinks: HyperlinkDto[]): HyperlinkDto[] {
    return hyperlinks.filter(hyperlink => hyperlink.description.startsWith("Image"));
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

  getContentByLanguage(language: Language, textDtos: TextDto[]): string | null {
    const textDto = textDtos.find(text => text.language === language);
    return textDto ? textDto.content : null;
  }

  protected readonly Language = Language;
  protected readonly Math = Math;
}
