import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from 'rxjs/operators';
import {faBars, faXmark} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isMenuCollapsed: boolean;
  activeMenuEntry: number;
  currentComponent: string;
  faBars = faBars;
  faXmark = faXmark;

  constructor(private router: Router) {
    this.currentComponent = "Our System"
    this.isMenuCollapsed = true;
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
      this.getRoute();
    });
  }

  ngOnInit(): void {
  }

  public toggleNav() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  private getRoute(): void {
    this.isMenuCollapsed = true;
    const currentUri = this.router.url;
    if (currentUri === "/") {
      this.activeMenuEntry = 1;
    } else if (currentUri === "/cv") {
      this.activeMenuEntry = 2;
    } else if (currentUri === "/project") {
      this.activeMenuEntry = 3;
    } else if (currentUri === "/publications") {
      this.activeMenuEntry = 4;
    } else if (currentUri === "/contact") {
      this.activeMenuEntry = 5;
    }
  }
}
