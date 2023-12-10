import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class Globals {
  readonly _dataUri: string = 'https://api.projects.hagn.network/public/hagn';
  readonly _getProjectsUri: string = this._dataUri + '/project';
  readonly _getProjectStatsUri: string = this._dataUri + '/project/stats';
  readonly _getSkillsUri: string = this._dataUri + '/skill';
  readonly _getSkillStatsUri: string = this._dataUri + '/skill/stats';
}
