import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { newsfeedJSON } from 'src/app/newsfeedData';

@Injectable({
  providedIn: 'root'
})

export class NewsfeedService {

  constructor(private _http: HttpClient) { }

  //define a URL from where to retrieve json data
  private jsonURL = 'http://localhost:5000/json';

  getData(): Observable<newsfeedJSON[]> {
    return this._http.get<newsfeedJSON[]>(this.jsonURL)
  }

}