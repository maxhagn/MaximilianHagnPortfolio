import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {

  public isDetailedView: boolean;

  constructor() {
    this.isDetailedView = false;
  }

  public setDetailed(flag: boolean): void {
    this.isDetailedView = flag;
  }

  ngOnInit(): void {
  }

}
