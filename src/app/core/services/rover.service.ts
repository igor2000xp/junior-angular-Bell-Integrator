import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoverName } from '../../mars/models/main-page.models';

@Injectable({
  providedIn: 'root'
})
export class RoverService {
  public rover$ = new BehaviorSubject<RoverName>(RoverName.Curiosity)

  // constructor() { }
  public setRover(rover:RoverName) {
    console.log(rover,'-service');
    this.rover$.next(rover);
  }
}
