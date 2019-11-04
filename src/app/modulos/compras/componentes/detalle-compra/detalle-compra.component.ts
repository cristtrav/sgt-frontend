import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidosproveedoresService } from './../../../../services/pedidosproveedores.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { PedidoProveedorDTO } from './../../../../dto/PedidoProveedorDTO';
import { DetallePedidoProveedorDTO } from './../../../../dto/DetallePedidoProveedorDTO';
import { DetalleCompraDTO } from './../../../../dto/DetalleCompraDTO';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompraDTO } from 'src/app/dto/CompraDTO';
import { ProveedoresService } from './../../../../services/proveedores.service';
import { ComprasService } from './../../../../services/compras.service';
import { ProveedorDTO } from './../../../../dto/ProveedorDTO';
import { RepuestosService } from './../../../../services/repuestos.service';
import { RepuestoDTO } from './../../../../dto/RepuestoDTO';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.component.html',
  styleUrls: ['./detalle-compra.component.css']
})
export class DetalleCompraComponent implements OnInit {

  indexEdit: number = null;
  idpedido = null;

  formCabecera: FormGroup;
  modoModificar = false;

  idrepuestoAgregar: number;
  cantidadAgregar: number;

  private detalleEditBk;

  proveedores: ProveedorDTO[];
  repuestos: RepuestoDTO[];

  pedidoFacturar: PedidoProveedorDTO = new PedidoProveedorDTO();
  detallesPedidoFacturar: DetallePedidoProveedorDTO[] = [];

  detallesCompra: DetalleCompraDTO[] = [];

  constructor(private route: ActivatedRoute,
    private pedidosProveedoresSrv: PedidosproveedoresService,
    private notification: NzNotificationService,
    private formBuilder: FormBuilder,
    private proveedoresSrv: ProveedoresService,
    private comprasSrv: ComprasService,
    private repuestosSrv: RepuestosService,
    private router: Router) { }

  ngOnInit() {
    this.cargarProveedores();
    this.cargarRepuestos();
    this.idpedido = this.route.snapshot.queryParamMap.get('idpedido');
    if (this.idpedido != null) {
      this.cargarDatosPedido(+this.idpedido);
    }
    this.formCabecera = this.formBuilder.group({
      codestablecimiento: [null, [Validators.required]],
      codpuntoemision: [null, [Validators.required]],
      nrofactura: [null, [Validators.required]],
      fecha: [null, [Validators.required]],
      tipo: [null, [Validators.required]],
      idproveedor: [null, [Validators.required]]
    });
  }

  cargarRepuestos() {
    this.repuestosSrv.getData().subscribe((data) => {
      this.repuestos = data;
    }, (err) => {
      this.notification.create('error', 'Error al cargar insumos', typeof err.error === 'string' ? err.error : err.message);
    });
  }

  private cargarProveedores() {
    this.proveedoresSrv.getData().subscribe((data) => {
      this.proveedores = data;
    }, (err) => {
      this.notification.create('error', 'Error al cargar proveedores', typeof err.error === 'string' ? err.error : err.message);
    });
  }

  private cargarDatosPedido(idpedido: number) {
    this.pedidosProveedoresSrv.getPedido(idpedido).subscribe((data) => {
      this.pedidoFacturar = data;
      this.formCabecera.get('idproveedor').setValue(this.pedidoFacturar.idproveedor);
      this.cargarDetallesPedido(idpedido);
    }, (err) => {
      if (typeof err.error === 'string') {
        this.notification.create('error', 'Error al cargar pedido', err.error);
      } else {
        this.notification.create('error', 'Error al cargar pedido', err.message);
      }
    });
  }

  private cargarDetallesPedido(idpedido: number) {
    this.pedidosProveedoresSrv.getDetallesPedido(idpedido).subscribe((data) => {
      this.detallesPedidoFacturar = data;
      const dcs: DetalleCompraDTO[] = [];
      for (const dp of this.detallesPedidoFacturar) {
        if (dp.cantidadRecibida < dp.cantidad) {
          const dc: DetalleCompraDTO = new DetalleCompraDTO();
          dc.cantidad = dp.cantidad - dp.cantidadRecibida;
          dc.precio = dp.precio;
          dc.subtotal = dp.subtotal;
          dc.idrepuesto = dp.idrepuesto;
          dc.repuesto = dp.repuesto;
          dc.porcentajeIva = dp.porcentajeIva;
          dcs.push(dc);
        }
      }
      this.detallesCompra = dcs;
    }, (err) => {
      if (typeof err.error === 'string') {
        this.notification.create('error', 'Error al cargar detalles de pedido', err.error);
      } else {
        this.notification.create('error', 'Error al cargar detalles de pedido', err.message);
      }
    });
  }

  private validar(): boolean {
    let validado = true;
    Object.keys(this.formCabecera.controls).forEach((key) => {
      const control = this.formCabecera.get(key);
      validado = validado && control.valid;
      control.markAsDirty();
      control.updateValueAndValidity();
    });
    return validado;
  }

  guardarCompra() {
    if (this.detallesCompra.length > 0) {
      if (this.validar()) {
        this.comprasSrv.postData(this.getDto()).subscribe(() => {
          this.notification.create('success', 'Compra guardada.', '');
          this.limpiarDatos();
        }, (err) => {
          this.notification.create('error', 'Error al guardar compra.', typeof err.error === 'string' ? err.error : err.message);
        });
      }
    } else {
      this.notification.create('error', 'Ningún producto agregado.', '');
    }
  }

  private getDto(): CompraDTO {
    const compra: CompraDTO = new CompraDTO();
    const fs: Date = this.formCabecera.get('fecha').value;
    const fc: Date = new Date(fs.getFullYear(), fs.getMonth(), fs.getDate(), 0, 0, 0);
    compra.fecha = fc;
    const ce: number = this.formCabecera.get('codestablecimiento').value;
    const cpe: number = this.formCabecera.get('codpuntoemision').value;
    const nrf: number = this.formCabecera.get('nrofactura').value;
    const nrofactura = ce.toString().padStart(3, '0') + '-' + cpe.toString().padStart(3, '0') + '-' + nrf.toString().padStart(7, '0');
    compra.nroFactura = nrofactura;
    compra.idproveedor = this.formCabecera.get('idproveedor').value;
    compra.detalle = this.detallesCompra;
    compra.idpedido = this.pedidoFacturar.idpedido;
    compra.contado = Number(this.formCabecera.get('tipo').value);
    let iva5 = 0;
    let iva10 = 0;
    let total = 0;
    for (const dc of this.detallesCompra) {
      total += dc.subtotal;
      if (dc.porcentajeIva !== 10 && dc.porcentajeIva !== 5 && dc.porcentajeIva !== 0) {
        dc.porcentajeIva = 10;
      }
      const factor = dc.porcentajeIva / 100;
      const montoIva = (dc.subtotal * factor) / (1 + factor);
      if (dc.porcentajeIva === 10) {
        iva10 += montoIva;
      } else if (dc.porcentajeIva === 5) {
        iva5 += montoIva;
      }
    }
    compra.total = total;
    compra.totalIva5 = iva5;
    compra.totalIva10 = +iva10.toFixed(2);
    return compra;
  }

  quitarDetalle(indice: number) {
    const arr = this.detallesCompra.splice(indice, indice);
    this.detallesCompra = arr;
  }

  startEditCantidad(i: number): void {
    this.indexEdit = i;
    this.detalleEditBk = { ...this.detallesCompra[i] };
  }

  aceptarEdicion() {
    this.indexEdit = null;
    this.calcularTotales();
  }

  cancelarEdicion() {
    this.detallesCompra[this.indexEdit] = this.detalleEditBk;
    this.indexEdit = null;
    this.detalleEditBk = null;
    this.calcularTotales();
  }

  private calcularTotales() {
    const arr = this.detallesCompra.slice();
    for (const dc of arr) {
      dc.subtotal = dc.cantidad * dc.precio;
    }
    this.detallesCompra = arr;
  }

  agregarDetalle() {
    const ca = this.cantidadAgregar != null ? this.cantidadAgregar : 1;
    const detalles = this.detallesCompra.slice();
    let existe = false;
    for (const dc of detalles) {
      if (dc.idrepuesto === this.idrepuestoAgregar) {
        existe = true;
        dc.cantidad = dc.cantidad + ca;
        dc.subtotal = dc.cantidad * dc.precio;
        break;
      }
    }
    if (!existe) {
      const dc: DetalleCompraDTO = new DetalleCompraDTO();
      dc.idrepuesto = this.idrepuestoAgregar;
      dc.cantidad = ca;
      for (const rep of this.repuestos) {
        if (rep.idrepuesto === this.idrepuestoAgregar) {
          dc.repuesto = rep.nombre;
          dc.precio = rep.precio;
          dc.porcentajeIva = rep.porcentajeIva;
          dc.subtotal = dc.precio * dc.cantidad;
          break;
        }
      }
      detalles.push(dc);
    }
    this.idrepuestoAgregar = null;
    this.cantidadAgregar = null;
    this.detallesCompra = detalles;
  }

  private limpiarDatos() {
    this.idpedido = null;
    this.detallesCompra = [];
    this.formCabecera.reset();
    this.pedidoFacturar = new PedidoProveedorDTO();
    this.router.navigateByUrl('/compras/detalle');
  }

}
