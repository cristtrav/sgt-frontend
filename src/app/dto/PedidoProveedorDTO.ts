import { DetallePedidoProveedorDTO } from './DetallePedidoProveedorDTO';

export class PedidoProveedorDTO {
  idpedido: number;
  idproveedor: number;
  proveedor: string;
  total: number;

  fechaPedido: Date;
  idfuncionarioPedido: number;
  nombresFuncionarioPedido: string;
  apellidosFuncionarioPedido: string;

  aprobado = 0;
  fechaAprobacion: Date;
  idfuncionarioAprobacion: number;
  nombresFuncionarioAprobacion: string;
  apellidosFuncionarioAprobacion: string;

  recibido = 0;
  fechaRecepcion: Date;
  idfuncionarioRecepcion: number;
  nombresFuncionarioRecepcion: string;
  apellidosFuncionarioRecepcion: string;

  detallepedido: DetallePedidoProveedorDTO[];
}
