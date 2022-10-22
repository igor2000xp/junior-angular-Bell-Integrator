import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoverName } from '../../mars/models/main-page.models';

@Injectable({
  providedIn: 'root'
})
export class RoverService {
  public rover$ = new BehaviorSubject<RoverName>(RoverName.Curiosity)

  public setRover(rover:RoverName) {
    this.rover$.next(rover);
  }
}
