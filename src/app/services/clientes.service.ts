import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ClienteDTO } from '../dto/ClienteDTO';
import { Observable } from 'rxjs';
import { CiudadDTO } from '../dto/CiudadDTO';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  url = 'http://localhost:3000/api/clientes';

  constructor(private http: HttpClient) { }

  postData(cliente: ClienteDTO): Observable<any> {
    return this.http.post<ClienteDTO>(this.url, cliente);
  }

  getData(): Observable<any> {
    return this.http.get<CiudadDTO>(this.url);
  }

  putData(cliente: ClienteDTO): Observable<any> {
    return this.http.put<CiudadDTO>(`${this.url}/${cliente.ci}`, cliente);
  }

  deleteData(cliente: ClienteDTO): Observable<any> {
    return this.http.delete(`${this.url}/${cliente.ci}`);
  }
}
