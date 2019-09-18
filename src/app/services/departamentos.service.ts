import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DepartamentoDTO } from '../dto/DepartamentoDTO';
import { Observable } from 'rxjs';
import { AppSettings } from './../util/AppSettings';


@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  url = `${AppSettings.urlAPI}/departamentos`;

  constructor(private http: HttpClient) { }

  getData(): Observable<DepartamentoDTO[]> {
    return this.http.get<DepartamentoDTO[]>(this.url);
  }

  postData(departamento: DepartamentoDTO): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.post<DepartamentoDTO>(this.url, departamento, httpOptions);
  }

  putData(departamento: DepartamentoDTO): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    return this.http.put<DepartamentoDTO>(`${this.url}/${departamento.iddepartamento}`, departamento, httpOptions);
  }

  deleteData(departamento: DepartamentoDTO): Observable<any> {
    return this.http.delete(`${this.url}/${departamento.iddepartamento}`);
  }
}
