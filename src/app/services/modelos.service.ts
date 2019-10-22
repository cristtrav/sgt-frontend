import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModeloDTO } from './../dto/ModeloDTO';
import { Observable } from 'rxjs';
import { AppSettings } from './../util/AppSettings';

@Injectable({
  providedIn: 'root'
})
export class ModelosService {

  private url = `${AppSettings.urlAPI}/modelos`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) { }

  postData(modelo: ModeloDTO) {
    return this.http.post<ModeloDTO>(this.url, modelo, this.httpOptions);
  }

  putData(modelo: ModeloDTO) {
    return this.http.put<ModeloDTO>(`${this.url}/${modelo.idmodelo}`, modelo, this.httpOptions);
  }

  getData(params): Observable<ModeloDTO[]> {
    if (params != null) {
      if (params.idmarca != null) {
        return this.http.get<ModeloDTO[]>(`${this.url}?idmarca=${params.idmarca}`);
      } else {
        return this.http.get<ModeloDTO[]>(this.url);
      }
    } else {
      return this.http.get<ModeloDTO[]>(this.url);
    }
  }

  deleteData(modelo: ModeloDTO): Observable<any> {
    return this.http.delete(`${this.url}/${modelo.idmodelo}`);
  }
}
