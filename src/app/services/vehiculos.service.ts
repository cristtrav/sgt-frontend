import { Injectable } from '@angular/core';
import { AppSettings } from './../util/AppSettings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehiculoDTO } from '../dto/VehiculoDTO';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  private url = `${AppSettings.urlAPI}/vehiculos`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) { }

  postData(vehiculo: VehiculoDTO): Observable<any> {
    return this.http.post<VehiculoDTO>(this.url, vehiculo, this.httpOptions);
  }

  putData(vehiculo: VehiculoDTO): Observable<any> {
    return this.http.put(this.url, vehiculo, this.httpOptions);
  }

  getData(): Observable<VehiculoDTO[]> {
    return this.http.get<VehiculoDTO[]>(this.url);
  }

  deleteData(vehiculo: VehiculoDTO): Observable<any> {
    return this.http.delete(`${this.url}/${vehiculo.idvehiculo}`);
  }
}
