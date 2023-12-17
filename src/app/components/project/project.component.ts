import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProjectDto} from "../../models/ProjectDto";
import {Language} from "../../models/Language";
import {TextDto} from "../../models/TextDto";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";

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
export class ProjectComponent {

  @Input() project: ProjectDto;
  @Output() overlayProject: EventEmitter<ProjectDto> = new EventEmitter();

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
}
