import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegionDTO } from '../dto/RegionDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionesService {

  url = 'http://localhost:3000/api/regiones';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<RegionDTO[]>( this.url );
  }

  postData(region: RegionDTO): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.post<RegionDTO>(this.url, region, httpOptions);
  }

  putData(region: RegionDTO): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.put<RegionDTO>(this.url + '/' + region.idregion, region, httpOptions);
  }

  deleteData(region: RegionDTO): Observable<any> {
    return this.http.delete(this.url + '/' + region.idregion);
  }


}
