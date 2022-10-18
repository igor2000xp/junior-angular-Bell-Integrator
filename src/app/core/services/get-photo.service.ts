import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { Cameras, IPhotos } from '../../mars/models/main-page.models';
import { API_KEY, HTML_REQUEST_TEMPLATE } from '../../constants';
import { ErrorService } from './error.service';
// import { RoverService } from './rover.service';

@Injectable({
  providedIn: 'root'
})
export class GetPhotoService {
  public rover:string = 'curiosity';
  public sol:number = 49;
  public camera:Cameras = Cameras.MAST;
  public requestString:string = '';
  public rover$ = new Subject();

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    // private roverService: RoverService,
    ) {
    this.requestString = `${HTML_REQUEST_TEMPLATE}${this.rover}/photos?sol=${this.sol}&camera=${this.camera}&api_key=${API_KEY}`
  }

  getAll(rover:string): Observable<IPhotos> {
    console.log(rover, '-getAll()');
    this.rover = rover;
    this.requestString = `${HTML_REQUEST_TEMPLATE}${this.rover}/photos?sol=${this.sol}&camera=${this.camera}&api_key=${API_KEY}`
    return this.http.get<IPhotos>(this.requestString)
      .pipe(
        catchError(this.errorHandler.bind(this)),
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
