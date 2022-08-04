import {Component, Input, OnInit} from '@angular/core';
import {NgScrollbar} from "ngx-scrollbar";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  @Input() scrollbarRef: NgScrollbar;

  constructor() {
  }

  ngOnInit(): void {
  }

}
