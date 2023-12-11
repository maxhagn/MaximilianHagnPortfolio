import {Component, ElementRef, Inject, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {NgScrollbar} from "ngx-scrollbar";
import {Subscription} from "rxjs";
import {DOCUMENT} from "@angular/common";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {SkillService} from "../../services/skill.service";
import {SkillStats} from "../../models/SkillStats";
import {SkillWithCountDto} from "../../models/SkillWithCountDto";
import {DeviconService} from "../../services/devicon.service";

declare function initCanvas(): any;

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  @Input() scrollbarRef: NgScrollbar;
  @ViewChild('skill_box', {read: ElementRef}) skillBoxElement;
  @ViewChildren('skillTags', {read: ElementRef}) skillTagsElement;
  public loadingSkills: boolean = true;
  public loadingSkillStats: boolean = true;
  public currentLanguage: string = "en";
  public skills: SkillWithCountDto[];
  public skillStats: SkillStats;
  public displaySkillStats: SkillStats = {
    skillCount: 0,
    softSkillCount: 0,
    languageCount: 0,
    technologyCount: 0
  };
  private _scrollSubscription = Subscription.EMPTY;

  constructor(private translate: TranslateService, @Inject(DOCUMENT) private document: Document, private skillService: SkillService, private deviconService: DeviconService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    });
  }

  public animate(event: any): void {
    this.setSkillStatsScroll();
  }

  public setSkillStatsScroll() {
    const position = this.skillBoxElement.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (position.top < windowHeight && position.bottom >= 0) {
      const relative = Math.min(1, (windowHeight - position.top) / 400)
      this.displaySkillStats.skillCount = Math.floor(this.skillStats.skillCount * relative)
      this.displaySkillStats.languageCount = Math.floor(this.skillStats.languageCount * relative)
      this.displaySkillStats.technologyCount = Math.floor(this.skillStats.technologyCount * relative)
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
        this._scrollSubscription = this.scrollbarRef.verticalScrolled.subscribe(e => {
          this.animate(e)
        });
      }
    );
  }

  getSkills(): void {
    this.skillService.getSkills().subscribe(
      (skills: SkillWithCountDto[]) => {
        this.skills = skills.sort((a, b) => {
          return b.count - a.count
        });
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
}
