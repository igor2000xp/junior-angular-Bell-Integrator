import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiGetPhotoService } from '../../core/services/api/api-get-photo.service';
import { Cameras, IManifest, IPhoto, RoverName } from '../models/main-page.models';
import { BehaviorSubject } from 'rxjs';
import { RoverService } from '../../core/services/rover.service';
import { SolService } from '../../core/services/sol.service';
import { CameraService } from '../../core/services/camera.service';
import { ApiGetManifestService } from '../../core/services/api/api-get-manifest.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  public photos:BehaviorSubject<any>;
  public loading = false;
  public photos$: BehaviorSubject<IPhoto[]>;
  private rover = RoverName.Opportunity;
  private sol = 49;
  public maxSol = 125;
  public maxPhoto = 25;
  private camera = Cameras.MAST;
  private manifest: IManifest;

  constructor(
    private getPhotos: ApiGetPhotoService,
    private getManifest: ApiGetManifestService,
    private roverService: RoverService,
    private solService: SolService,
    private cameraService: CameraService,
  ) { }

  private tunePagesParams(maxSol: number, currentSol:number) {

  }

  private logRover(data: RoverName): void {
    console.log(data, 'receive data');
    this.rover = data;
    this.getPhotos.getAll(this.rover, this.sol, this.camera);
      // .subscribe((data) => {
      // this.photos$.next(data.photos);
      // this.photos = data.photos;
      // this.loading = false;
    // });
    this.getManifest.getAll(this.rover).subscribe((data) => {
      this.manifest = data.photo_manifest;
      console.log(data.photo_manifest.max_sol, this.manifest.max_sol);
      this.maxSol = this.manifest.max_sol;
    });
    console.log(this.manifest);
  }
  private logSol(sol: number) {
    this.sol = sol;
    // this.photos = this.getPhotos.getAll(this.rover, this.sol, this.camera);
    this.getPhotos.getAll(this.rover, this.sol, this.camera);
    //   .subscribe((data) => {
    //     this.photos = data.photos;
    // });
  }
  public logCamera(camera: Cameras) {
    this.camera = camera;
    this.getPhotos.getAll(this.rover, this.sol, this.camera);
    //   .subscribe((data) => {
    //     this.photos = data.photos;
    // });
  }

  ngOnInit(): void {

    // this.loading = true;
    // this.photos$ = this.getPhotos.getAll();
    // this.getPhotos.getAll()
    //   .pipe(
    //   tap((data) => this.photos$ = data.photos)
    // );
    this.photos = this.getPhotos.photos$;

    this.roverService.rover$.subscribe((rover) => this.logRover(rover));
    this.solService.sol$.subscribe((sol) => this.logSol(sol));
    this.cameraService.camera$.subscribe((camera) => this.logCamera(camera));

    this.getManifest.getAll(this.rover).subscribe((data) => {
      this.manifest = data.photo_manifest;
      this.maxSol = this.manifest.max_sol;
    });
    // this.maxSol = this.manifest.max_sol;

    this.getPhotos.getAll(this.rover, this.sol, this.camera)
      .subscribe((data) => {
      // this.photos$.next(data.photos);
      // this.photos = data.photos;
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.roverService.rover$.unsubscribe();
    this.solService.sol$.unsubscribe();
    this.cameraService.camera$.unsubscribe();
    // this.getPhotos.getAll(this.rover, this.sol, this.camera).un
  }

}
