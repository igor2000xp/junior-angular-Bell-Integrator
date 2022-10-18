import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetPhotoService } from '../../core/services/get-photo.service';
import { Cameras, IPhoto, RoverName } from '../models/main-page.models';
import { BehaviorSubject } from 'rxjs';
import { RoverService } from '../../core/services/rover.service';
import { SolService } from '../../core/services/sol.service';
import { CameraService } from '../../core/services/camera.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  public photos:IPhoto[] = [];
  public loading = false;
  public photos$: BehaviorSubject<IPhoto[]>;
  private rover = RoverName.Opportunity;
  private sol = 49;
  private camera = Cameras.MAST;

  constructor(
    private getPhotos: GetPhotoService,
    private roverService: RoverService,
    private solService: SolService,
    private cameraService: CameraService,
  ) { }

  private logRover(data: RoverName): void {
    console.log(data, 'receive data');
    this.rover = data;
    this.getPhotos.getAll(this.rover, this.sol, this.camera).subscribe((data) => {
      // this.photos$.next(data.photos);
      this.photos = data.photos;
      // this.loading = false;
    });
  }
  private logSol(sol: number) {
    this.sol = sol;
    // this.photos = this.getPhotos.getAll(this.rover, this.sol, this.camera);
    this.getPhotos.getAll(this.rover, this.sol, this.camera)
      .subscribe((data) => {
        this.photos = data.photos;
    });
  }
  public logCamera(camera: Cameras) {
    this.camera = camera;
    this.getPhotos.getAll(this.rover, this.sol, this.camera)
      .subscribe((data) => {
        this.photos = data.photos;
    })
  }

  ngOnInit(): void {
    // this.loading = true;
    // this.photos$ = this.getPhotos.getAll();
    // this.getPhotos.getAll()
    //   .pipe(
    //   tap((data) => this.photos$ = data.photos)
    // );
    // ngOnInit(): void {
    this.roverService.rover$.subscribe((rover) => this.logRover(rover));
    this.solService.sol$.subscribe((sol) => this.logSol(sol));
    this.cameraService.camera$.subscribe((camera) => this.logCamera(camera));
    // }
    this.getPhotos.getAll(this.rover, this.sol, this.camera).subscribe((data) => {
      // this.photos$.next(data.photos);
      this.photos = data.photos;
      // this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.roverService.rover$.unsubscribe();
    this.solService.sol$.unsubscribe();
    this.cameraService.camera$.unsubscribe();
    // this.getPhotos.getAll(this.rover, this.sol, this.camera).un
  }

}
