import {Component, OnInit} from '@angular/core';
import {faLaptopCode} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  faLaptopCode = faLaptopCode;


  constructor() {
  }

  ngOnInit(): void {
  }

}
