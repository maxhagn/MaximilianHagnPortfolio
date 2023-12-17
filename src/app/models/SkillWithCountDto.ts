import {SkillCategory} from "./SkillCategory";

export interface SkillWithCountDto {
  id?: number;
  name: string;
  skillCategory: SkillCategory;
  count: number;
  icon: string;
}
