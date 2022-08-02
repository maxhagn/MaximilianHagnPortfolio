import {Component} from '@angular/core';
import {Project} from "../../models/project";
import projects from '../../../assets/data/projects.json';
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {faEarthEurope, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {Keyword} from "../../models/keyword";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  faGithub = faGithub;
  faBrowser = faEarthEurope;
  faMagnifyingGlass = faMagnifyingGlass;

  public projects: Project[] = projects;
  public currentSelectedProjects: Project[];
  public currentLanguage: string = "en";
  public currentSelect: Keyword;
  public selectableTags: Keyword[] =
    [
      {tag: "Top"},
      {tag: "Java Spring Boot"},
      {tag: "Angular"},
      {tag: "Website"},
      {tag: "C"},
      {tag: "Flex"},
      {tag: "Yacc/Bison"},
      {tag: "University"},
      {tag: "Blender"},
      {tag: "Matlab"},
      {tag: "R Studio"},
      {tag: "OpenMP"},
      {tag: "MPI"},
      {tag: "C++"},
      {tag: "LLVM"},
      {tag: "Java"},
      {tag: "Security"},
      {tag: "CSS"},
      {tag: "JavaScript"}
    ];

  constructor(private translate: TranslateService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    });
    this.changeSelectedProjects(this.selectableTags[0]);
    this.selectableTags.sort(function(a, b) {
      return a.tag.localeCompare(b.tag);
    });
  }

  changeSelectedProjects(tag: Keyword) {
    this.currentSelect = tag;
    this.currentSelectedProjects = this.projects.filter(x => x.keywords.some(g => this.currentSelect.tag.includes(g.tag)));
  }
}
