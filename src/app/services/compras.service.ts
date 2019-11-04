import { Injectable } from '@angular/core';
import { AppSettings } from './../util/AppSettings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CompraDTO } from './../dto/CompraDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private url = `${AppSettings.urlAPI}/compras`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) { }

  postData(compra: CompraDTO): Observable<any> {
    return this.http.post<CompraDTO>(this.url, compra, this.httpOptions);
  }

  getData(): Observable<CompraDTO[]> {
    return this.http.get<CompraDTO[]>(`${this.url}?anulado=0`);
  }

  postAnulacion(compra: CompraDTO): Observable<any> {
    return this.http.post(`${this.url}/anulacion`, compra, this.httpOptions);
  }
}
