import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiGetPhotoService } from '../../core/services/api/api-get-photo.service';
import { Cameras, IPhoto, RoverName } from '../models/main-page.models';
import { BehaviorSubject, Subscription } from 'rxjs';
import { RoverService } from '../../core/services/rover.service';
import { SolService } from '../../core/services/sol.service';
import { CameraService } from '../../core/services/camera.service';
import { PageService } from '../../core/services/page.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  public loading = false;
  private rover = RoverName.Opportunity;
  private sol = 49;
  public maxPhotoTotal = 125;
  public maxPhoto = 25;
  private camera = Cameras.MAST;
  public photos:IPhoto[];
  public camerasArray:Cameras[];
  public page:number = 1;

  public subPhoto = new Subscription();
  public photos$:BehaviorSubject<IPhoto[]>;

  constructor(
    private apiGetPhotos: ApiGetPhotoService,
    private roverService: RoverService,
    private solService: SolService,
    private cameraService: CameraService,
    private pageService: PageService,
  ) { }

  onClickHandle() {
    this.page = this.photos.length < 25 ? 1 : this.page + 1;
    this.pageService.setPage(this.page);
    this.subPhoto = this.apiGetPhotos.getAll(this.rover, this.sol, this.camera, this.page)
      .subscribe((el) => {
        this.photos = el.photos;
        this.maxPhotoTotal = this.photos.length;
      });
  }

  private logRover(data: RoverName): void {
    this.page = 1;
    this.rover = data;
    this.subPhoto = this.apiGetPhotos.getAll(this.rover, this.sol, this.camera, this.page).subscribe((el) => {
      this.photos = el.photos;
      this.maxPhotoTotal = this.photos.length;
    });
  }
  private logSol(sol: number) {
    this.page = 1;
    this.sol = sol;
    this.subPhoto = this.apiGetPhotos.getAll(this.rover, this.sol, this.camera, this.page).subscribe();
  }
  public logCamera(camera: Cameras) {
    this.page = 1;
    this.camera = camera;
    this.subPhoto = this.apiGetPhotos.getAll(this.rover, this.sol, this.camera, this.page).subscribe();
  }
  public logPage(page: number) {
    this.page = page;
    this.subPhoto = this.apiGetPhotos.getAll(this.rover, this.sol, this.camera, this.page).subscribe();
  }

  ngOnInit(): void {
    this.apiGetPhotos.photos$.subscribe();
    this.photos$ = this.apiGetPhotos.photos$;
    this.subPhoto = this.apiGetPhotos.getAll(this.rover, this.sol, this.camera, this.page).subscribe();

    this.roverService.rover$.subscribe((rover) => this.logRover(rover));
    this.solService.sol$.subscribe((sol) => this.logSol(sol));
    this.cameraService.camera$.subscribe((camera) => this.logCamera(camera));
    this.pageService.page$.subscribe((page) => this.logPage(page));
  }

  ngOnDestroy(): void {
    this.roverService.rover$.unsubscribe();
    this.solService.sol$.unsubscribe();
    this.cameraService.camera$.unsubscribe();
    this.apiGetPhotos.photos$.unsubscribe();
    this.subPhoto.unsubscribe();
  }
}
