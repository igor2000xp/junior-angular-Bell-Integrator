import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiGetPhotoService } from '../../core/services/api/api-get-photo.service';
import { Cameras, IPhoto, RoverName } from '../models/main-page.models';
import { BehaviorSubject, Subscription } from 'rxjs';
import { RoverService } from '../../core/services/rover.service';
import { SolService } from '../../core/services/sol.service';
import { CameraService } from '../../core/services/camera.service';
import { PageService } from '../../core/services/page.service';
// import { ApiGetManifestService } from '../../core/services/api/api-get-manifest.service';

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
  // private manifest: IManifest;
  public photos:IPhoto[];
  public camerasArray:Cameras[];
  public page:number = 1;

  // private abc:any;

  public subPhoto = new Subscription();
  public photos$:BehaviorSubject<IPhoto[]>;
  // public manifest$ = new Subject<IManifest>();
  // public subManifest = new Subscription();

  constructor(
    private apiGetPhotos: ApiGetPhotoService,
    // private apiGetManifest: ApiGetManifestService,
    private roverService: RoverService,
    private solService: SolService,
    private cameraService: CameraService,
    private pageService: PageService,
  ) { }

  // private tunePagesParams(maxSol: number, currentSol:number) {
  //
  // }
  onClickHandle() {
    this.page = this.photos.length < 25 ? 1 : this.page + 1;
    this.pageService.setPage(this.page);
    console.log('click', this.page, this.photos.length);
    this.subPhoto = this.apiGetPhotos.getAll(this.rover, this.sol, this.camera, this.page)
      .subscribe((el) => {
        this.photos = el.photos;
        this.maxPhotoTotal = this.photos.length;
        console.log(this.photos);
      });
    console.log('click', this.page, this.photos.length);

  }

  private logRover(data: RoverName): void {
    console.log(data, 'receive data');
    this.page = 1;
    this.rover = data;
    this.subPhoto = this.apiGetPhotos.getAll(this.rover, this.sol, this.camera, this.page).subscribe((el) => {
      this.photos = el.photos;
      this.maxPhotoTotal = this.photos.length;
      console.log(this.photos);
    });
    // this.subManifest = this.apiGetManifest.getAll(this.rover).subscribe((el) => {
    //   this.manifest = el.photo_manifest;
    //   this.camerasArray = this.manifest.photos[this.sol].cameras as Cameras[];
    //   // this.maxPhotoTotal = this.manifest.photos[this.sol - 1].total_photos;
    //   console.log(this.camerasArray, '- main-total photo');
    // });

    // this.photos$ = this.apiGetPhotos.photos$;

    // this.apiGetManifest.getAll(this.rover);

    // this.apiGetManifest.getAll(this.rover).subscribe((data) => {
    //   this.manifest = data.photo_manifest;
    //   console.log(data.photo_manifest.max_sol, this.manifest.max_sol);
    //   this.maxSol = this.manifest.max_sol;
    // });
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
    // this.apiGetPhotos.photos$
    //   .subscribe();
    this.subPhoto = this.apiGetPhotos.getAll(this.rover, this.sol, this.camera, this.page).subscribe();

    this.roverService.rover$.subscribe((rover) => this.logRover(rover));
    this.solService.sol$.subscribe((sol) => this.logSol(sol));
    this.cameraService.camera$.subscribe((camera) => this.logCamera(camera));
    this.pageService.page$.subscribe((page) => this.logPage(page));

    // this.manifest$ = this.apiGetManifest.manifest$;
    // this.subManifest = this.apiGetManifest.getAll(this.rover).subscribe();
    // this.apiGetManifest.manifest$.subscribe((el) => {
    //   this.manifest = el;
    //   this.maxPhotoTotal = this.manifest.photos[this.sol - 1].total_photos;
    // });


  }

  ngOnDestroy(): void {
    this.roverService.rover$.unsubscribe();
    this.solService.sol$.unsubscribe();
    this.cameraService.camera$.unsubscribe();
    this.apiGetPhotos.photos$.unsubscribe();
    this.subPhoto.unsubscribe();
    // this.apiGetManifest.manifest$.unsubscribe();
    // this.apiGetPhotos.getAll(this.rover, this.sol, this.camera).un
  }

}
