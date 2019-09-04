import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CiudadDTO } from './../dto/CiudadDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  url = 'http://localhost:3000/api/ciudades';

  constructor(private http: HttpClient) { }

  getData(limit, offset): Observable<CiudadDTO[]> {
    let httpParams: HttpParams = new HttpParams();

    if (limit != null) {
      httpParams = httpParams.append('limit', limit);
      if (offset != null) {
        if (offset > 0) {
          httpParams = httpParams.append('offset', offset);
        }
      }
    }
    const options = limit != null ? { params: httpParams } : {};
    return this.http.get<CiudadDTO[]>(this.url, options);
  }

  postData(ciudad: CiudadDTO): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.post<CiudadDTO>(this.url, ciudad, httpOptions);
  }

  putData(ciudad: CiudadDTO): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.put<CiudadDTO>(`${this.url}/${ciudad.idciudad}`, ciudad, httpOptions);
  }

  deleteData(ciudad: CiudadDTO): Observable<any> {
    return this.http.delete<CiudadDTO>(`${this.url}/${ciudad.idciudad}`);
  }

  getTotal(): Observable<any> {
    return this.http.get(`${this.url}/total`);
  }
}
