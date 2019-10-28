import { DetallePedidoProveedorDTO } from './DetallePedidoProveedorDTO';

export class PedidoProveedorDTO {
  idpedido: number;
  fechaPedido: Date;
  idproveedor: number;
  proveedor: string;
  total: number;
  recibido: number;
  fechaRecepcion: Date;
  idfuncionario: number;
  nombresFuncionario: string;
  apellidosFuncionario: string;
  detallepedido: DetallePedidoProveedorDTO[];
}
