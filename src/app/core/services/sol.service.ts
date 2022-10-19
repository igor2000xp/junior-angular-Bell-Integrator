import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolService {
  public sol$ = new BehaviorSubject<number>(49);
  // constructor() { }

  public setSol(sol: number) {
    // console.log(sol, '-sol-Service');
    this.sol$.next(sol);
    // console.log(this.sol$, '-sol-Service2');
  }
}
