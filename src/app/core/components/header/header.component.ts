import { Component, OnInit } from '@angular/core';
import { Cameras, RoverName } from '../../../mars/models/main-page.models';
import { RoverService } from '../../services/rover.service';
import { SolService } from '../../services/sol.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public rover = RoverName.Curiosity;
  public sol = 49;
  public camera = Cameras.MAST;
  public cameraValue = Cameras.MAST;

  constructor(
    private roverService: RoverService,
    private solService: SolService,
  ) { }

  changeCameraHandler(cameraValue: Cameras): void {
    console.log(cameraValue);
  }
  changeRoverHandler(rover: RoverName): void {
    console.log(rover);
    this.roverService.setRover(rover);

  }
  changeSolHandler(sol: number): void {
    console.log(sol);
    this.solService.setSol(sol);
  }

  ngOnInit(): void {
  }

}
