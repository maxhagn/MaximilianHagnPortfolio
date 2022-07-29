import {Component, OnInit} from '@angular/core';
import {Project} from "../../models/project";
import projects from '../../../assets/data/projects.json';
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  public projects: Project[] = projects;
  public currentLanguage: string = "en";

  constructor(private translate: TranslateService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    });
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    });
  }

}
