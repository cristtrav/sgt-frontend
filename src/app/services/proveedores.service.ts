import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProveedorDTO } from './../dto/ProveedorDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  url = 'http://localhost:3000/api/proveedores';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) { }

  getData(): Observable<ProveedorDTO[]> {
    return this.http.get<ProveedorDTO[]>(this.url);
  }

  postData(proveedor: ProveedorDTO): Observable<any> {
    return this.http.post<ProveedorDTO>(this.url, proveedor, this.httpOptions);
  }

  putData(proveedor: ProveedorDTO): Observable<any> {
    return this.http.put<ProveedorDTO>(`${this.url}/${proveedor.idproveedor}`, proveedor, this.httpOptions);
  }

  deleteData(proveedor: ProveedorDTO): Observable<any> {
    return this.http.delete(`${this.url}/${proveedor.idproveedor}`);
  }

}
