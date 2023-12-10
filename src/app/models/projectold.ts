import {Keyword} from "./keyword";

export class Projectold {

  constructor(public title: string,
              public description_en: string,
              public description_de: string,
              public date: string,
              public keywords: Keyword[],
              public website: string,
              public github: string,
              public gridClass: string) {
  }

}
