import { Injectable } from '@angular/core';
import { AppSettings } from './../util/AppSettings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ServicioDTO } from './../dto/ServicioDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  private url = `${AppSettings.urlAPI}/servicios`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) { }

  getData(): Observable<ServicioDTO[]> {
    return this.http.get<ServicioDTO[]>(this.url);
  }

  postData(servicio: ServicioDTO): Observable<any> {
    return this.http.post<ServicioDTO>(this.url, servicio, this.httpOptions);
  }

  putData(servicio: ServicioDTO): Observable<any> {
    return this.http.put<ServicioDTO>(this.url, servicio, this.httpOptions);
  }

  deleteData(servicio: ServicioDTO): Observable<any> {
    return this.http.delete(`${this.url}/${servicio.idservicio}`);
  }
}
