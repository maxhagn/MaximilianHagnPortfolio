import { Injectable } from '@angular/core';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class DeviconService {

  deviconMap= new Map<string, string>([
    ["C", "devicon-c-plain"],
    ["C++", "devicon-cplusplus-plain"],
    ["Java", "devicon-java-plain"],
    ["PHP", "devicon-php-plain"],
    ["Apache", "devicon-apache-plain"],
    ["Angular", "devicon-angularjs-plain"],
    ["Cmake", "devicon-cmake-plain"],
    ["CMake", "devicon-cmake-plain"],
    ["CSS", "devicon-css3-plain"],
    ["Cucumber", "devicon-cucumber-plain"],
    ["Debian", "devicon-debian-plain"],
    ["Docker", "devicon-docker-plain"],
    [".Net", "devicon-dot-net-plain"],
    ["eslint", "devicon-eslint-plain"],
    ["Figma", "devicon-figma-plain"],
    ["GCC", "devicon-gcc-plain"],
    ["GitHub", "devicon-github-plain"],
    ["Git", "devicon-git-plain"],
    ["Grafana", "devicon-grafana-plain"],
    ["Gradle", "devicon-gradle-plain"],
    ["Haskell", "devicon-haskell-plain"],
    ["HTML5", "devicon-html5-plain"],
    ["Intellij", "devicon-intellij-plain"],
    ["JavaScript", "devicon-javascript-plain"],
    ["Java Script", "devicon-javascript-plain"], // fix skill in projects website // fix skill in projects website
    ["Kotlin", "devicon-kotlin-plain"],
    ["Laravel", "devicon-laravel-plain"],
    ["Latex", "devicon-latex-plain"],
    ["Matlab", "devicon-matlab-plain"],
    ["MATLAB", "devicon-matlab-plain"], // fix skill in projects website // fix skill in projects website
    ["MongoDB", "devicon-mongodb-plain"],
    ["MySQL", "devicon-mysql-plain"],
    ["Nginx", "devicon-nginx-plain"],
    ["NPM", "devicon-npm-plain"],
    ["PostgresSQL", "devicon-postgresql-plain"],
    ["jQuery", "devicon-jquery-plain"],
    ["Blender", "devicon-blender-original"],
    ["Python", "devicon-python-plain"],
    ["R", "devicon-r-plain"],
    ["React", "devicon-react-plain"],
    ["Redis", "devicon-redis-plain"],
    ["Sass", "devicon-sass-plain"],
    ["Swift", "devicon-swift-plain"],
    ["Selenium", "devicon-selenium-plain"],
    ["Spring Boot", "devicon-spring-plain"],
    ["TailwindCSS", "devicon-tailwindcss-plain"],
    ["Ubuntu", "devicon-ubuntu-plain"],
    ["TypeScript", "devicon-typescript-plain"],
    ["Vue", "devicon-vuejs-plain"],
    ["Kubernetes", "devicon-kubernetes-plain"],
  ]);

  constructor() { }

  getDeviconPath(skill: string): string {
    let cssClass = this.deviconMap.get(skill);
    if (cssClass) {
      return cssClass;
    }
    //console.log(skill + " is missing!")
    return "";
  }
}
