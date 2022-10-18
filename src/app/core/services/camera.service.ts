import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cameras } from '../../mars/models/main-page.models';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  public camera$ = new BehaviorSubject<Cameras>(Cameras.MAST);
  // constructor() { }
  public setCamera(camera: Cameras) {
    this.camera$.next(camera);
    console.log(camera, '-camera-service');
  }
}
