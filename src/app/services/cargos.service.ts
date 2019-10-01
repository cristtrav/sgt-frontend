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

}
