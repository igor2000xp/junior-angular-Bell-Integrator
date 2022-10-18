import { Component, OnInit } from '@angular/core';
import { Cameras } from '../../../mars/models/main-page.models';
import { RoverService } from '../../services/rover.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public rover: string = 'Curiosity';
  public sol = 49;
  public camera = Cameras.MAST;
  public cameraValue:string = Cameras.MAST;

  constructor(
    private roverService: RoverService,
  ) { }

  changeCameraHandler(cameraValue: string) {
    console.log(cameraValue);
  }
  changeRoverHandler(rover: string) {
    console.log(rover);
    this.roverService.setRover(rover);

  }
  changeSolHandler(sol: number) {
    console.log(sol);
  }

  ngOnInit(): void {
  }

}
