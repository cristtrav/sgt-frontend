import { DetalleCompraDTO } from './DetalleCompraDTO';

export class CompraDTO {
  idcompra: number;
  fecha: Date;
  nroFactura: string;
  idproveedor: number;
  proveedor: string;
  contado: number;
  pagado: number;
  total: number;
  totalIva10: number;
  totalIva5: number;
  idpedido: number;
  detalle: DetalleCompraDTO[];
}
