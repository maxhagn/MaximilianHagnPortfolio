import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SkillsComponent} from "../components/skills/skills.component";
import {ProjectsComponent} from "../components/projects/projects.component";
import {HeroComponent} from "../components/hero/hero.component";

const routes: Routes = [

  {path: '', component: HeroComponent},
  {path: 'skills', component: SkillsComponent},
  {path: 'projects', component: ProjectsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
