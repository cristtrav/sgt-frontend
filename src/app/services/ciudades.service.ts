import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CiudadDTO } from './../dto/CiudadDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  url = 'http://localhost:3000/api/ciudades';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get<CiudadDTO[]>(this.url);
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
}
