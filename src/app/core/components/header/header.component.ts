import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cameras, IManifest, RoverName } from '../../../mars/models/main-page.models';
import { RoverService } from '../../services/rover.service';
import { SolService } from '../../services/sol.service';
import { CameraService } from '../../services/camera.service';
import { ApiGetManifestService } from '../../services/api/api-get-manifest.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public rover = RoverName.Curiosity;
  public camerasArray:Cameras[];
  public sol = 49;
  public camera = Cameras.MAST;
  public cameraValue = Cameras.MAST;

  private subManifest = new Subscription();
  // private manifest:I

  constructor(
    private roverService: RoverService,
    private solService: SolService,
    private cameraService: CameraService,
    private apiGetManifestService: ApiGetManifestService,
  ) { }

  changeCameraHandler(camera: Cameras): void {
    // console.log(camera);
    this.cameraService.setCamera(camera);

  }
  changeRoverHandler(rover: RoverName): void {
    // console.log(rover);
    this.roverService.setRover(rover);
    this.subManifest = this.apiGetManifestService.getAll(this.rover).subscribe((el) => {
      const manifest:IManifest = el.photo_manifest;
      this.camerasArray = manifest.photos[this.sol].cameras as Cameras[];
      // console.log(this.camerasArray);
    });

  }
  changeSolHandler(sol: number): void {
    // console.log(sol);
    this.solService.setSol(sol);
  }

  ngOnInit(): void {
    this.subManifest = this.apiGetManifestService.getAll(this.rover).subscribe((el) => {
      const manifest:IManifest = el.photo_manifest;
      this.camerasArray = manifest.photos[this.sol].cameras as Cameras[];
      // console.log(this.camerasArray);
    });
  }

  ngOnDestroy(): void {
    this.subManifest.unsubscribe();
  }

}
