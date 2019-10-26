import { Injectable } from '@angular/core';
import { AppSettings } from './../util/AppSettings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RepuestoDTO } from './../dto/RepuestoDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepuestosService {

  private url = `${AppSettings.urlAPI}/repuestos`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) { }

  getData(): Observable<RepuestoDTO[]> {
    return this.http.get<RepuestoDTO[]>(this.url);
  }

  postData(repuesto: RepuestoDTO): Observable<any> {
    return this.http.post<RepuestoDTO>(this.url, repuesto, this.httpOptions);
  }

  putData(repuesto: RepuestoDTO): Observable<any> {
    return this.http.put<RepuestoDTO>(this.url, repuesto, this.httpOptions);
  }

  deleteData(repuesto: RepuestoDTO): Observable<any> {
    return this.http.delete(`${this.url}/${repuesto.idrepuesto}`);
  }
}
