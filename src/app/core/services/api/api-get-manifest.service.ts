import { Injectable } from '@angular/core';
import { IWrappedManifest, RoverName } from '../../../mars/models/main-page.models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HTML_MANIFEST_TEMPLATE, HTML_MANIFEST_TEMPLATE_SECOND } from '../../../constants';
import { catchError, Observable, throwError } from 'rxjs';
import { ErrorService } from '../error.service';

@Injectable({
  providedIn: 'root'
})
export class ApiGetManifestService{
  public rover = RoverName.Curiosity;
  private requestString = '';


  constructor(
    private errorService: ErrorService,
    private http: HttpClient,
  ) {
    this.requestString = `${HTML_MANIFEST_TEMPLATE}${this.rover}${HTML_MANIFEST_TEMPLATE_SECOND}`;
  }
  getAll(rover: RoverName): Observable<IWrappedManifest> {
    this.rover = rover;
    this.requestString = `${HTML_MANIFEST_TEMPLATE}${this.rover}${HTML_MANIFEST_TEMPLATE_SECOND}`;
    return this.http.get<IWrappedManifest>(this.requestString).pipe(
      catchError(this.errorHandler.bind(this)),
    );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
