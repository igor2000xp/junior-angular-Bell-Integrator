import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { Cameras, IPhoto, IPhotos, RoverName } from '../../../mars/models/main-page.models';
import { API_KEY, HTML_ROVER_TEMPLATE } from '../../../constants';
import { ErrorService } from '../error.service';

@Injectable({
  providedIn: 'root'
})
export class ApiGetPhotoService{
  public rover:RoverName = RoverName.Opportunity;
  public sol:number = 49;
  public camera:Cameras = Cameras.MAST;
  public page:number = 1;
  public requestString:string = '';

  public photos$:BehaviorSubject<IPhoto[]> = new BehaviorSubject<IPhoto[]>([]);

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    ) {
    this.requestString = `${HTML_ROVER_TEMPLATE}${this.rover}/photos?sol=${this.sol}&page=0&camera=${this.camera}&api_key=${API_KEY}`
  }

  getAll(rover:RoverName, sol:number, camera:Cameras, page:number): Observable<IPhotos> {
    this.rover = rover;
    this.sol = sol;
    this.camera = camera;

    let params = new HttpParams()
      .set('sol', this.sol)
      .set('camera', this.camera)
      .set('page', page)
      .set('api_key', API_KEY);
    // params = params.append('sol', this.sol);
    // params = params.append('camera', this.camera);
    // params = params.append('page', page);
    // params = params.append('api_key', API_KEY);

    this.requestString = `${HTML_ROVER_TEMPLATE}${this.rover}/photos`;
    return this.http.get<IPhotos>(this.requestString, { params: params })
      .pipe(
        map((element) => {
          this.photos$.next(element.photos);
          return element;
        }),
        catchError(this.errorHandler.bind(this)),
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
