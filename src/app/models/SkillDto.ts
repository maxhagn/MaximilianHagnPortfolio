import {SkillCategory} from "./SkillCategory";

export interface SkillDto {
    id?: number;
    name: string;
    skillCategory: SkillCategory;
}