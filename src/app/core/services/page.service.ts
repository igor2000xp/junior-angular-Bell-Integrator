import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  public page$:BehaviorSubject<number> = new BehaviorSubject<number>(1);

  public setPage(page: number) {
    this.page$.next(page);
    console.log(this.page$);
  }

}
