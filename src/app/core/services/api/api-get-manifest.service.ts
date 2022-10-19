import { Injectable } from '@angular/core';
import { IManifest, IWrappedManifest, RoverName } from '../../../mars/models/main-page.models';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { API_KEY, HTML_MANIFEST_TEMPLATE } from '../../../constants';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { ErrorService } from '../error.service';

@Injectable({
  providedIn: 'root'
})
export class ApiGetManifestService{
  public rover = RoverName.Curiosity;
  private requestString = '';

  public manifest$ = new Subject<IManifest>();


  constructor(
    private errorService: ErrorService,
    private http: HttpClient,
  ) {
    // this.requestString = `${HTML_MANIFEST_TEMPLATE}${this.rover}${HTML_MANIFEST_TEMPLATE_SECOND}`;
  }
  getAll(rover: RoverName): Observable<IWrappedManifest> {
    this.rover = rover;
    let params = new HttpParams().set('api_key', API_KEY);
    this.requestString = `${HTML_MANIFEST_TEMPLATE}${this.rover}`;

    return this.http.get<IWrappedManifest>(this.requestString, { params: params }).pipe(
      map((el) => {
        this.manifest$.next(el.photo_manifest);
        return el;
      }),
      catchError(this.errorHandler.bind(this)),
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
