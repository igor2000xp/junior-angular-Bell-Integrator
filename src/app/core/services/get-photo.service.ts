import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPhotos } from '../../mars/models/main-page.models';
import { HTML_REQUEST_EXAMPLE_1 } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class GetPhotoService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<IPhotos> {
    return this.http.get<IPhotos>(HTML_REQUEST_EXAMPLE_1);
  }
}
