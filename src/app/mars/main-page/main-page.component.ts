import { Component, OnInit } from '@angular/core';
import { GetPhotoService } from '../../core/services/get-photo.service';
import { IPhoto } from '../models/main-page.models';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  public photos:IPhoto[] = [];
  public exp = [{name:'Curios', id:1},{name:'Curios2', id:2}];

  constructor(private getPhotos: GetPhotoService) { }

  ngOnInit(): void {
    this.getPhotos.getAll().subscribe((data) => {
      this.photos = data.photos;
      console.log(this.photos[0].rover.name);
    })
  }

}
