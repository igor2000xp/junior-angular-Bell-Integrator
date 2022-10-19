import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolService {
  public sol$ = new BehaviorSubject<number>(49);

  public setSol(sol: number) {
    this.sol$.next(sol);
  }
}
