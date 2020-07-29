import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(
    private httpClient:HttpClient,

  ) { }

  patchHero(url,params): Observable<{}> {
   return this.httpClient.request('GET', url, params);
  }
}
