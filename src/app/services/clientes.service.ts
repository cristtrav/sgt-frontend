import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ClienteDTO } from '../dto/ClienteDTO';
import { Observable } from 'rxjs';
import { AppSettings } from './../util/AppSettings';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  url = `${AppSettings.urlAPI}/clientes`;

  constructor(private http: HttpClient) { }

  postData(cliente: ClienteDTO): Observable<any> {
    return this.http.post<ClienteDTO>(this.url, cliente);
  }

  getData(limit, offset): Observable<ClienteDTO[]> {
    let httpParams: HttpParams = new HttpParams();
    if (limit != null) {
      httpParams = httpParams.set('limit', limit);
      if (offset != null) {
        if (offset > 0) {
          httpParams = httpParams.set('offset', offset);
        }
      }
    }
    const options = { params: httpParams };
    return this.http.get<ClienteDTO[]>(this.url, options);
  }

  putData(cliente: ClienteDTO): Observable<any> {
    return this.http.put<ClienteDTO>(`${this.url}/${cliente.ci}`, cliente);
  }

  deleteData(cliente: ClienteDTO): Observable<any> {
    return this.http.delete(`${this.url}/${cliente.ci}`);
  }

  getTotal(): Observable<any> {
    return this.http.get(`${this.url}/total`);
  }
}
