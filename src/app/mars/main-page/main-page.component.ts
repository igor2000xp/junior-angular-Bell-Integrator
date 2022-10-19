import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiGetPhotoService } from '../../core/services/api/api-get-photo.service';
import { Cameras, IManifest, IPhoto, RoverName } from '../models/main-page.models';
import { BehaviorSubject, map, Subject, Subscription } from 'rxjs';
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
  public loading = false;
  private rover = RoverName.Opportunity;
  private sol = 49;
  public maxSol = 125;
  public maxPhoto = 25;
  private camera = Cameras.MAST;
  private manifest: IManifest;
  public photos:IPhoto[];

  public subPhoto = new Subscription();
  public photos$:BehaviorSubject<IPhoto[]>;
  public manifest$ = new Subject();

  constructor(
    private apiGetPhotos: ApiGetPhotoService,
    private apiGetManifest: ApiGetManifestService,
    private roverService: RoverService,
    private solService: SolService,
    private cameraService: CameraService,
  ) { }

  // private tunePagesParams(maxSol: number, currentSol:number) {
  //
  // }

  private logRover(data: RoverName): void {
    console.log(data, 'receive data');
    this.rover = data;
    this.apiGetPhotos.getAll(this.rover, this.sol, this.camera);
    console.log(this.subPhoto);
    // this.photos$ = this.apiGetPhotos.photos$;

    // this.apiGetManifest.getAll(this.rover);

    // this.apiGetManifest.getAll(this.rover).subscribe((data) => {
    //   this.manifest = data.photo_manifest;
    //   console.log(data.photo_manifest.max_sol, this.manifest.max_sol);
    //   this.maxSol = this.manifest.max_sol;
    // });
  }
  private logSol(sol: number) {
    this.sol = sol;
    this.apiGetPhotos.getAll(this.rover, this.sol, this.camera);
  }
  public logCamera(camera: Cameras) {
    this.camera = camera;
    this.apiGetPhotos.getAll(this.rover, this.sol, this.camera);
  }

  ngOnInit(): void {
    this.roverService.rover$.subscribe((rover) => this.logRover(rover));
    this.solService.sol$.subscribe((sol) => this.logSol(sol));
    this.cameraService.camera$.subscribe((camera) => this.logCamera(camera));

    this.manifest$ = this.apiGetManifest.manifest$;
    this.apiGetManifest.getAll(this.rover).subscribe();
    this.manifest$.pipe(
      map((el) => console.log(el))
    );

    // this.manifest = this.manifest$;
    // this.maxSol = this.manifest$.

    // this.apiGetManifest.getAll(this.rover).subscribe((data) => {
    //   this.manifest = data.photo_manifest;
    //   this.maxSol = this.manifest.max_sol;
    // });
    // this.maxSol = this.manifest.max_sol;

    this.photos$ = this.apiGetPhotos.photos$;
    // this.apiGetPhotos.photos$
    //   .subscribe();
    this.subPhoto = this.apiGetPhotos.getAll(this.rover, this.sol, this.camera).subscribe();
  }

  ngOnDestroy(): void {
    this.roverService.rover$.unsubscribe();
    this.solService.sol$.unsubscribe();
    this.cameraService.camera$.unsubscribe();
    this.apiGetPhotos.photos$.unsubscribe();
    // this.apiGetPhotos.getAll(this.rover, this.sol, this.camera).un
  }

}
