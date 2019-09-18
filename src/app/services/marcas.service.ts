import { Injectable } from '@angular/core';
import { AppSettings } from './../util/AppSettings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MarcaDTO } from './../dto/MarcaDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {

  private url = `${AppSettings.urlAPI}/marcas`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) { }

  getData(): Observable<MarcaDTO[]> {
    return this.http.get<MarcaDTO[]>(this.url);
  }

  postData(marca: MarcaDTO): Observable<any> {
    return this.http.post<MarcaDTO>(this.url, marca, this.httpOptions);
  }

  putData(marca: MarcaDTO): Observable<any> {
    return this.http.put<MarcaDTO>(`${this.url}/${marca.idmarca}`, marca, this.httpOptions);
  }

  deleteData(marca: MarcaDTO): Observable<any> {
    return this.http.delete(`${this.url}/${marca.idmarca}`);
  }
}
