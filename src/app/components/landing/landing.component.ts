import {Component, Input, OnInit} from '@angular/core';
import {faLaptopCode} from "@fortawesome/free-solid-svg-icons";
import {NgScrollbar} from "ngx-scrollbar";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  @Input() scrollbarRef: NgScrollbar;
  faLaptopCode = faLaptopCode;


  constructor() {
  }

  ngOnInit(): void {
  }

}
