import { Component, Input, OnInit } from '@angular/core';
import { IPhoto } from '../../models/main-page.models';

@Component({
  selector: 'app-img-card',
  templateUrl: './img-card.component.html',
  styleUrls: ['./img-card.component.scss']
})
export class ImgCardComponent implements OnInit {
  @Input() photo: IPhoto;
  constructor() {
  }

  ngOnInit(): void {
  }
}
