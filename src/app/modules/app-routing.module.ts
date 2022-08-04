import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CvComponent} from "../components/cv/cv.component";
import {ProjectsComponent} from "../components/projects/projects.component";
import {PublicationsComponent} from "../components/publications/publications.component";
import {LandingComponent} from "../components/landing/landing.component";

const routes: Routes = [

  {path: '', component: LandingComponent},
  {path: 'cv', component: CvComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'publications', component: PublicationsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
