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
  public maxSol = 10;
  public camera = Cameras.MAST;
  public cameraValue = Cameras.MAST;

  private subManifest = new Subscription();

  constructor(
    private roverService: RoverService,
    private solService: SolService,
    private cameraService: CameraService,
    private apiGetManifestService: ApiGetManifestService,
  ) { }

  changeCameraHandler(camera: Cameras): void {
    this.cameraService.setCamera(camera);
    this.subManifest = this.apiGetManifestService.getAll(this.rover).subscribe((el) => {
      const manifest:IManifest = el.photo_manifest;
      this.maxSol = manifest.photos.length;
      this.camerasArray = manifest.photos[this.sol].cameras as Cameras[];
    });

  }
  changeRoverHandler(rover: RoverName): void {
    this.roverService.setRover(rover);
    this.subManifest = this.apiGetManifestService.getAll(this.rover).subscribe((el) => {
      const manifest:IManifest = el.photo_manifest;
      this.maxSol = manifest.photos.length;
      this.camerasArray = manifest.photos[this.sol].cameras as Cameras[];
    });

  }
  changeSolHandler(sol: number): void {
    this.solService.setSol(sol);
    this.subManifest = this.apiGetManifestService.getAll(this.rover).subscribe((el) => {
      const manifest:IManifest = el.photo_manifest;
      this.maxSol = manifest.photos.length;
      this.camerasArray = manifest.photos[this.sol].cameras as Cameras[];
    });
  }

  ngOnInit(): void {
    this.subManifest = this.apiGetManifestService.getAll(this.rover).subscribe((el) => {
      const manifest:IManifest = el.photo_manifest;
      this.maxSol = manifest.photos.length;
      this.camerasArray = manifest.photos[this.sol].cameras as Cameras[];
    });
  }

  ngOnDestroy(): void {
    this.subManifest.unsubscribe();
  }
}
