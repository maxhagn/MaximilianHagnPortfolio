import {Component, ElementRef, HostListener, Inject, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {SkillService} from "../../services/skill.service";
import {SkillStats} from "../../models/SkillStats";
import {SkillWithCountDto} from "../../models/SkillWithCountDto";
import {DeviconService} from "../../services/devicon.service";
import {SkillDto} from "../../models/SkillDto";

declare function initCanvas(): any;

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  @ViewChild('skill_box', {read: ElementRef}) skillBoxElement;
  @ViewChildren('skillTags', {read: ElementRef}) skillTagsElement;
  public loadingSkills: boolean = true;
  public loadingSkillStats: boolean = true;
  public currentLanguage: string = "en";
  public skills: SkillWithCountDto[];
  public skillStats: SkillStats;
  public currentPage: number = 0;
  public displaySkillStats: SkillStats = {
    skillCount: 0,
    softSkillCount: 0,
    languageCount: 0,
    technologyCount: 0
  };


  constructor(private translate: TranslateService, @Inject(DOCUMENT) private document: Document, private skillService: SkillService, private deviconService: DeviconService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    });
  }

  @HostListener('window:scroll', ['$event'])
  public animate(event: any): void {
    this.setSkillStatsScroll();
  }

  public setSkillStatsScroll() {
    if (this.skillBoxElement) {
      const position = this.skillBoxElement.nativeElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (position.top < windowHeight && position.bottom >= 0) {
        const relative = Math.min(1, (windowHeight - position.top) / 400)
        this.displaySkillStats.skillCount = Math.floor(this.skillStats.skillCount * relative)
        this.displaySkillStats.languageCount = Math.floor(this.skillStats.languageCount * relative)
        this.displaySkillStats.technologyCount = Math.floor(this.skillStats.technologyCount * relative)
      }
    }
  }

  ngOnInit(): void {
    this.getSkills();
    this.getSkillStats();
  }

  getSkillStats(): void {
    this.skillService.getSkillStats().subscribe(
      (skillStats: SkillStats) => {
        this.skillStats = skillStats;
        this.loadingSkillStats = false;
      }
    );
  }

  getSkills(): void {
    this.skillService.getSkills().subscribe(
      (skills: SkillWithCountDto[]) => {
        this.skills = skills
          .map(skill => ({
            ...skill,
            icon: this.deviconService.getDeviconPath(skill.name)
          }))
          .filter(skill => skill.icon != '')
          .sort((a, b) => b.count - a.count);
        this.loadingSkills = false;
        this.skillTagsElement.changes.subscribe((skillTagElement: QueryList<ElementRef>) => {
          if (skillTagElement.length > 0) {
            initCanvas();
          }
        });
      }
    );
  }

  getSkillGraphic(name: string): string {
    return this.deviconService.getDeviconPath(name);
  }

  getArrayChunk(arr: any[], start: number, chunkSize: number): SkillWithCountDto[] {
    return arr.slice(start, start + chunkSize);
  }

}
