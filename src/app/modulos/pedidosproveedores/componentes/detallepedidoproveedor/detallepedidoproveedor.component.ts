import { Component, OnInit } from '@angular/core';
import { DetallePedidoProveedorDTO } from './../../../../dto/DetallePedidoProveedorDTO';
import { RepuestoDTO } from './../../../../dto/RepuestoDTO';
import { RepuestosService } from './../../../../services/repuestos.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedoresService } from './../../../../services/proveedores.service';
import { ProveedorDTO } from './../../../../dto/ProveedorDTO';
import { PedidoProveedorDTO } from './../../../../dto/PedidoProveedorDTO';
import { PedidosproveedoresService } from './../../../../services/pedidosproveedores.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detallepedidoproveedor',
  templateUrl: './detallepedidoproveedor.component.html',
  styleUrls: ['./detallepedidoproveedor.component.css']
})
export class DetallepedidoproveedorComponent implements OnInit {

  modoModificar = false;
  idpedidoModificar: number;
  recibidoPedidoModificar = false;

  detallesPedidos: DetallePedidoProveedorDTO[] = [];
  repuestos: RepuestoDTO[];
  proveedores: ProveedorDTO[];

  idrepuestoagregar: number;
  idrepuestoagregarValidateStatus = 'success';
  cantidadRepuestoAgregar: number;

  formCabecera: FormGroup;

  fechaRecepcionValidStatus = 'success';
  fechaRecepcionValidationMsg = 'Ingrese la fecha de recepción.'

  constructor(private repuestosSrv: RepuestosService,
              private notification: NzNotificationService,
              private formBuilder: FormBuilder,
              private proveedoresSrv: ProveedoresService,
              private pedidosproveedoresSrv: PedidosproveedoresService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.formCabecera = this.formBuilder.group({
      idproveedor: [null, Validators.required],
      fechapedido: [null, [Validators.required]],
      fecharecepcion: [null, []]
    });

    this.cargarRepuestos();
    this.cargarProveedores();


    const parametroUrl = this.route.snapshot.paramMap.get('detallepedido');
    console.log('parametro recibido: ' + parametroUrl);

    if (parametroUrl !== 'nuevo') {
      const idpedido: number = Number(parametroUrl);
      if (!isNaN(idpedido)) {
        this.cargarDatosPedido(idpedido);
      }
    }
  }

  private cargarDatosPedido(id: number) {
    this.pedidosproveedoresSrv.getPedido(id).subscribe((data) => {
      this.modoModificar = true;
      this.idpedidoModificar = data.idpedido;
      this.recibidoPedidoModificar = data.recibido === 1 ? true : false;

      if (this.modificar && this.recibidoPedidoModificar) {

        this.formCabecera.get('fecharecepcion').setValue(new Date(data.fechaRecepcion));
        this.formCabecera.get('fechapedido').setValue(new Date(data.fechaPedido));
        this.formCabecera.get('idproveedor').setValue(data.idproveedor);
      } else {
        this.formCabecera.get('fechapedido').setValue(new Date(data.fechaPedido));
        this.formCabecera.get('idproveedor').setValue(data.idproveedor);
      }


      this.cargarDetallesPedido(id);
    }, (err) => {
      if (typeof err.error === 'string') {
        this.notification.create('error', 'Error al cargar pedido', err.error);
      } else {
        this.notification.create('error', 'Error al cargar pedido', err.message);
      }
    });
  }

  private cargarDetallesPedido(id: number) {
    this.pedidosproveedoresSrv.getDetallesPedido(id).subscribe((data) => {
      this.detallesPedidos = data;
    }, (err) => {
      if (typeof err.error === 'string') {
        this.notification.create('error', 'Error al cargar detalles del pedido', err.error);
      } else {
        this.notification.create('error', 'Error al cargar detalles del pedido', err.message);
      }
    });
  }

  cargarRepuestos() {
    this.repuestosSrv.getData().subscribe((data) => {
      this.repuestos = data;
    }, (err) => {
      if (typeof err.error === 'string') {
        this.notification.create('error', 'Error al cargar insumos', err.error);
      } else {
        this.notification.create('error', 'Error al cargar insumos', err.message);
      }
    });
  }

  cargarProveedores() {
    this.proveedoresSrv.getData().subscribe((data) => {
      this.proveedores = data;
    }, (err) => {
      if (typeof err.error === 'string') {
        this.notification.create('error', 'Error al cargar proveedores', err.error);
      } else {
        this.notification.create('error', 'Error al cargar proveedores', err.message);
      }
    });
  }

  agregarRepuesto() {
    if (this.idrepuestoagregar != null) {
      this.idrepuestoagregarValidateStatus = 'success';
      let existe = false;
      for (const dp of this.detallesPedidos) {
        if (dp.idrepuesto === this.idrepuestoagregar) {
          existe = true;
          dp.cantidad = dp.cantidad + this.cantidadRepuestoAgregar;
          dp.subtotal = dp.cantidad * dp.precio;
          this.detallesPedidos = this.detallesPedidos.slice();
          break;
        }
      }
      if (!existe) {
        const detallepedido: DetallePedidoProveedorDTO = new DetallePedidoProveedorDTO();
        detallepedido.cantidad = this.cantidadRepuestoAgregar != null ? this.cantidadRepuestoAgregar : 1;
        detallepedido.idrepuesto = this.idrepuestoagregar;
        for (const rp of this.repuestos) {
          if (rp.idrepuesto === this.idrepuestoagregar) {
            detallepedido.repuesto = rp.nombre;
            detallepedido.precio = rp.precio;
          }
        }
        detallepedido.subtotal = detallepedido.cantidad * detallepedido.precio;
        const dtpd: DetallePedidoProveedorDTO[] = this.detallesPedidos.slice();
        dtpd.push(detallepedido);
        this.detallesPedidos = dtpd;
      }
      this.cantidadRepuestoAgregar = null;
      this.idrepuestoagregar = null;
    } else {
      this.notification.create('warning', 'Seleccione un insumo', '');
      this.idrepuestoagregarValidateStatus = 'error';
    }
  }

  calcularTotal(): number {
    let total = 0;
    for (const dtp of this.detallesPedidos) {
      total = total + dtp.subtotal;
    }
    return total;
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

  guardarPedido() {
    if (this.validar()) {
      if (this.detallesPedidos.length > 0) {
        if (this.modoModificar) {
          if (this.recibidoPedidoModificar && this.formCabecera.get('fecharecepcion') == null) {
            this.fechaRecepcionValidStatus = 'error';
            this.fechaRecepcionValidationMsg = 'Ingrese la fecha de recepción.';
          } else {
            this.fechaRecepcionValidStatus = 'success';
            this.fechaRecepcionValidationMsg = '';
            this.modificar();
          }
        } else {
          this.crear();
        }
      } else {
        this.notification.create('error', 'Error al guardar.', 'Ningún insumo agregado');
      }
    }
  }

  private crear() {
    this.pedidosproveedoresSrv.postData(this.getDto()).subscribe(() => {
      this.notification.create('success', 'Guardado correctamente.', '');
      this.limpiarDatos();
    }, (err) => {
      if (typeof err.error === 'string') {
        this.notification.create('error', 'Error al guardar.', err.error);
      } else {
        this.notification.create('error', 'Error al guardar.', err.message);
      }
    });
  }

  private modificar() {
    this.pedidosproveedoresSrv.putData(this.getDto()).subscribe(() => {
      this.notification.create('success', 'Guardado correctamente.', '');
    }, (err) => {
      if (typeof err.error === 'string') {
        this.notification.create('error', 'Error al guardar.', err.error);
      } else {
        this.notification.create('error', 'Error al guardar.', err.message);
      }
    });
  }

  quitarDetalle(index: number) {
    const dp = this.detallesPedidos.splice(index, index);
    this.detallesPedidos = dp;
  }

  private getDto() {
    const pedidoproveedor: PedidoProveedorDTO = new PedidoProveedorDTO();
    pedidoproveedor.idpedido = this.idpedidoModificar;
    const fp: Date = new Date(this.formCabecera.get('fechapedido').value);
    pedidoproveedor.fechaPedido = new Date(fp.getFullYear(), fp.getMonth(), fp.getDate(), 0, 0, 0);
    console.log('fecha recepcion getdto: ' + this.formCabecera.get('fecharecepcion').value);
    if (this.formCabecera.get('fecharecepcion').value != null) {
      const fr: Date = new Date(this.formCabecera.get('fecharecepcion').value);
      pedidoproveedor.fechaRecepcion = new Date(fr.getFullYear(), fr.getMonth(), fr.getDate(), 0, 0, 0);
    }
    pedidoproveedor.idproveedor = this.formCabecera.get('idproveedor').value;
    pedidoproveedor.detallepedido = this.detallesPedidos;
    pedidoproveedor.total = this.calcularTotal();
    pedidoproveedor.idfuncionario = 1;
    return pedidoproveedor;
  }

  limpiarDatos() {
    this.formCabecera.reset();
    this.detallesPedidos = [];
  }

}
