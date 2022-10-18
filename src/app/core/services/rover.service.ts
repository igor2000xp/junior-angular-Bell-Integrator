import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoverName } from '../../mars/models/main-page.models';

@Injectable({
  providedIn: 'root'
})
export class RoverService {
  public rover$ = new BehaviorSubject<string>(RoverName.Curiosity)

  // constructor() { }
  public setRover(rover:string) {
    console.log(rover,'-service');
    this.rover$.next(rover);
  }
}
