import {Component, OnInit} from '@angular/core';
import {faPhone, faEnvelope, faHouse, faUsersViewfinder, faInfo} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {

  public faPhone = faPhone;
  public faEnvelope = faEnvelope;
  public faHouse = faHouse;
  public faUsersViewfinder = faUsersViewfinder
  public faInfo = faInfo;

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
