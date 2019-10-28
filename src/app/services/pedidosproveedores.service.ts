import { Injectable } from '@angular/core';
import { AppSettings } from './../util/AppSettings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PedidoProveedorDTO } from './../dto/PedidoProveedorDTO';
import { Observable } from 'rxjs';
import { DetallePedidoProveedorDTO } from '../dto/DetallePedidoProveedorDTO';

@Injectable({
  providedIn: 'root'
})
export class PedidosproveedoresService {

  private url = `${AppSettings.urlAPI}/pedidosproveedores`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) { }

  postData(pedido: PedidoProveedorDTO): Observable<any> {
    return this.http.post<PedidoProveedorDTO>(this.url, pedido, this.httpOptions);
  }

  getData(): Observable<PedidoProveedorDTO[]> {
      return this.http.get<PedidoProveedorDTO[]>(this.url);
  }

  deleteData(pedido: PedidoProveedorDTO): Observable<any> {
    return this.http.delete(`${this.url}/${pedido.idpedido}`);
  }

  getPedido(idpedido: number): Observable<PedidoProveedorDTO>{
    return this.http.get<PedidoProveedorDTO>(`${this.url}/${idpedido}`);
  }

  getDetallesPedido(idpedido: number): Observable<DetallePedidoProveedorDTO[]> {
    return this.http.get<DetallePedidoProveedorDTO[]>(`${this.url}/${idpedido}/detalles`);
  }

  putData(pedido: PedidoProveedorDTO): Observable<any> {
    return this.http.put<PedidoProveedorDTO>(this.url, pedido, this.httpOptions);
  }
}
