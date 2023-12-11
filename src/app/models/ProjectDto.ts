import {SkillDto} from "./SkillDto";
import {HyperlinkDto} from "./HyperlinkDto";
import {TextDto} from "./TextDto";
import {ProjectCategory} from "./ProjectCategory";
import {Role} from "./Role";
import {Language} from "./Language";
import {ProjectType} from "./ProjectType";

export interface ProjectDto {
  id: string;
  name?: string;
  shortDescription?: TextDto[];
  description?: TextDto[];
  goal?: TextDto[];
  workDays?: number;
  skills?: SkillDto[];
  category?: ProjectCategory;
  type?: ProjectType;
  relevanceScore?: number;
  client?: string;
  startedAt?: Date;
  completedAt?: Date;
  links?: HyperlinkDto[];
  volume?: string;
  roles: Role[];
  language: Language;
  teamSize: number;
  completionPercent: number;
  active?: boolean;
  reviewed?: boolean;
  cv?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  gridClass?: string
}
