import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Globals} from "../globals";
import {Observable} from "rxjs";
import {Projectold} from "../models/projectold";
import {ProjectDto} from "../models/ProjectDto";
import {ProjectStats} from "../models/ProjectStats";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private httpClient: HttpClient, private globals: Globals) {
  }

  getProjects(): Observable<ProjectDto[]> {
    return this.httpClient.get<ProjectDto[]>(this.globals._getProjectsUri)
  }

  getProjectStats(): Observable<ProjectStats> {
    return this.httpClient.get<ProjectStats>(this.globals._getProjectStatsUri)
  }
}
