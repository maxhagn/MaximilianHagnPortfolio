import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnInit,
  QueryList,
  ViewChild, ViewChildren
} from '@angular/core';
import {faEnvelope, faHouse, faInfo, faPhone, faUsersViewfinder} from "@fortawesome/free-solid-svg-icons";
import {NgScrollbar} from "ngx-scrollbar";
import {Subscription} from "rxjs";
import {DOCUMENT} from "@angular/common";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {ProjectStats} from "../../models/ProjectStats";
import {ProjectDto} from "../../models/ProjectDto";
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
export class SkillsComponent implements AfterViewInit, OnInit {

  /*Scroll Animations*/
  @Input() scrollbarRef: NgScrollbar;
  @ViewChild('heading', {read: ElementRef}) headingElement;
  @ViewChild('name', {read: ElementRef}) nameElement;
  @ViewChild('link_container', {read: ElementRef}) linkContainerElement;
  @ViewChild('personal_data', {read: ElementRef}) personalDataElement;
  @ViewChild('education', {read: ElementRef}) educationElement;
  @ViewChild('employment', {read: ElementRef}) employmentElement;
  @ViewChild('recognitions', {read: ElementRef}) recognitionsElement;
  @ViewChild('languages', {read: ElementRef}) languagesElement;
  @ViewChild('skills', {read: ElementRef}) skillsElement;
  @ViewChildren('skillTags', {read: ElementRef}) skillTagsElement;
  public scrollTops: number[] = new Array<number>(9);
  public isVisible: boolean[] = new Array(9).fill(false);
  public loadingSkills: boolean = true;
  public loadingSkillStats: boolean = true;
  /*Icons*/
  public faPhone = faPhone;
  public faEnvelope = faEnvelope;
  public faHouse = faHouse;
  public faUsersViewfinder = faUsersViewfinder
  public faInfo = faInfo;
  /*Skills Detailed View*/
  public isDetailedView: boolean;
  private _scrollSubscription = Subscription.EMPTY;

  public currentLanguage: string = "en";
  public skills: SkillWithCountDto[];
  public skillStats: SkillStats;

  constructor(private translate: TranslateService, @Inject(DOCUMENT) private document: Document, private skillService: SkillService, private deviconService: DeviconService) {
    this.isDetailedView = false;
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLanguage = event.lang;
    });
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.calculateScrollTops();
      this._scrollSubscription = this.scrollbarRef.verticalScrolled.subscribe(e => {
        this.animate(e)
      });
    }, 1000)
  }

  @HostListener('window:resize', ['$event'])
  onResizeEvent() {
    this.calculateScrollTops();
  }

  public calculateScrollTops(): void {
    /*
    this.scrollTops[0] = this.headingElement.nativeElement.offsetTop + (this.headingElement.nativeElement.scrollHeight / 2);
    this.scrollTops[1] = this.nameElement.nativeElement.offsetTop + (this.nameElement.nativeElement.scrollHeight / 2);
    this.scrollTops[2] = this.linkContainerElement.nativeElement.offsetTop + (this.linkContainerElement.nativeElement.scrollHeight / 2);


    this.scrollTops[3] = this.personalDataElement.nativeElement.offsetTop + (this.personalDataElement.nativeElement.scrollHeight / 2);
    this.scrollTops[4] = this.educationElement.nativeElement.offsetTop + (this.educationElement.nativeElement.scrollHeight / 2);
    this.scrollTops[5] = this.employmentElement.nativeElement.offsetTop + (this.employmentElement.nativeElement.scrollHeight / 2);
    this.scrollTops[6] = this.recognitionsElement.nativeElement.offsetTop + (this.recognitionsElement.nativeElement.scrollHeight / 2);
    this.scrollTops[7] = this.languagesElement.nativeElement.offsetTop + (this.languagesElement.nativeElement.scrollHeight / 2);
    this.scrollTops[8] = this.skillsElement.nativeElement.offsetTop + (this.skillsElement.nativeElement.scrollHeight / 2);
    */

  }

  public animate(event): void {
    if (event.target.scrollTop + this.document.body.clientHeight > this.scrollTops[0] - 100) {
      this.calculateScrollTops();
    }
    this.scrollTops.forEach((scrollTop, index) => {
      if (event.target.scrollTop + this.document.body.clientHeight > scrollTop) {
        this.isVisible[index] = true;
      }
    })
  }

  public setDetailed(flag: boolean): void {
    this.isDetailedView = flag;
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
        this.skills = skills;
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
