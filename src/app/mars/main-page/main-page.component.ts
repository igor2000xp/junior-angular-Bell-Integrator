import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetPhotoService } from '../../core/services/get-photo.service';
import { IPhoto } from '../models/main-page.models';
import { BehaviorSubject } from 'rxjs';
import { RoverService } from '../../core/services/rover.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  public photos:IPhoto[] = [];
  public loading = false;
  public photos$: BehaviorSubject<IPhoto[]>;
  private rover = 'Opportunity';

  constructor(
    private getPhotos: GetPhotoService,
    private roverService: RoverService,
  ) { }

  private log(data: string): void {
    console.log(data, 'receive data');
    this.rover = data;
    this.getPhotos.getAll(this.rover).subscribe((data) => {
      // this.photos$.next(data.photos);
      this.photos = data.photos;
      // this.loading = false;
    });
  }

  ngOnInit(): void {
    // this.loading = true;
    // this.photos$ = this.getPhotos.getAll();
    // this.getPhotos.getAll()
    //   .pipe(
    //   tap((data) => this.photos$ = data.photos)
    // );
    // ngOnInit(): void {
    this.roverService.rover$.subscribe((rover) => this.log(rover));
    // }
    this.getPhotos.getAll(this.rover).subscribe((data) => {
      // this.photos$.next(data.photos);
      this.photos = data.photos;
      // this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.roverService.rover$.unsubscribe();
  }

}
