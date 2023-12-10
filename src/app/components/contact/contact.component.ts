import {Component, Input, OnInit} from '@angular/core';
import {NgScrollbar} from "ngx-scrollbar";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() scrollbarRef: NgScrollbar;

  constructor() { }

  ngOnInit(): void {
  }

}
