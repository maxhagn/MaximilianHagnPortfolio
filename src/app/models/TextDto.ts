import {Language} from "./Language";

export interface TextDto {
    id?: number;
    content: string;
    language: Language;
}