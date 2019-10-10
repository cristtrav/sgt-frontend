import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CargoDTO } from '../dto/CargoDTO';
import { Observable } from 'rxjs';
import { AppSettings } from './../util/AppSettings';

@Injectable({
  providedIn: 'root'
})
export class CargosService {

  private url = `${AppSettings.urlAPI}/cargos`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) { }

  getData(): Observable<CargoDTO[]> {
    return this.http.get<CargoDTO[]>(this.url);
  }

  postData(cargo: CargoDTO): Observable<any> {
    return this.http.post<CargoDTO>(this.url, cargo, this.httpOptions);
  }

  deleteData(cargo: CargoDTO): Observable<any> {
    return this.http.delete(`${this.url}/${cargo.idcargo}`);
  }

  putData(cargo: CargoDTO): Observable<any> {
    return this.http.put<CargoDTO>(this.url, cargo, this.httpOptions);
  }

}
