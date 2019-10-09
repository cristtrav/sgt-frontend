import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FuncionarioDTO } from '../dto/FuncionarioDTO';
import { Observable } from 'rxjs';
import { AppSettings } from './../util/AppSettings';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  private url = `${AppSettings.urlAPI}/funcionarios`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) { }

  postData(funcionario: FuncionarioDTO): Observable<any> {
    return this.http.post(this.url, funcionario, this.httpOptions);
  }

  getData(): Observable<FuncionarioDTO[]> {
    return this.http.get<FuncionarioDTO[]>(this.url);
  }

  putData(funcionario: FuncionarioDTO): Observable<any> {
    return this.http.put(this.url, funcionario, this.httpOptions);
  }

  deleteData(funcionario: FuncionarioDTO) {
    return this.http.delete(`${this.url}/${funcionario.idfuncionario}`);
  }
}
