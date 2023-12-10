import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Globals} from "../globals";
import {Observable} from "rxjs";
import {SkillWithCountDto} from "../models/SkillWithCountDto";
import {SkillStats} from "../models/SkillStats";

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  constructor(private httpClient: HttpClient, private globals: Globals) {
  }

  getSkills(): Observable<SkillWithCountDto[]> {
    return this.httpClient.get<SkillWithCountDto[]>(this.globals._getSkillsUri)
  }

  getSkillStats(): Observable<SkillStats> {
    return this.httpClient.get<SkillStats>(this.globals._getSkillStatsUri)
  }
}
