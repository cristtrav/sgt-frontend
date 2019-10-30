import { Component, OnInit } from '@angular/core';
import { PedidoProveedorDTO } from './../../../../dto/PedidoProveedorDTO';
import { PedidosproveedoresService } from './../../../../services/pedidosproveedores.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-vista-pedidosproveedores',
  templateUrl: './vista-pedidosproveedores.component.html',
  styleUrls: ['./vista-pedidosproveedores.component.css']
})
export class VistaPedidosproveedoresComponent implements OnInit {

  pedidosproveedores: PedidoProveedorDTO[];

  constructor(private pedidosProveedoresSrv: PedidosproveedoresService,
              private notification: NzNotificationService,
              private modal: NzModalService) { }

  ngOnInit() {
    this.cargarPedidosProveedores();
  }

  cargarPedidosProveedores() {
    this.pedidosProveedoresSrv.getData().subscribe((data) => {
      this.pedidosproveedores = data;
    }, (err) => {
      if (typeof err.error === 'string') {
        this.notification.create('error', 'Error al cargar pedidos', err.error);
      } else {
        this.notification.create('error', 'Error al cargar pedidos', err.message);
      }
    });
  }

  formatDate(strdate: string): string {
    const date = new Date(strdate);
    let ff = date.getDate().toString().padStart(2, '0');
    ff += '-' + (date.getMonth() + 1).toString().padStart(2, '0');
    ff += '-' + date.getFullYear();
    return ff;
  }

  confirmarEliminacion(pedido: PedidoProveedorDTO) {
    this.modal.confirm({
      nzTitle: '<i>¿Desea anular el pedido?</i>',
      nzContent: `<b> Código ${pedido.idpedido}. Proveedor: ${pedido.proveedor}. Monto: ${pedido.total} </b>`,
      nzOkType: 'danger',
      nzOkText: 'Anular',
      nzWrapClassName: 'vertical-center-modal',
      nzOnOk: () => {
        this.pedidosProveedoresSrv.postAnulacion(pedido.idpedido).subscribe(() => {
          this.cargarPedidosProveedores();
          this.notification.create('success', 'Pedido anulado', '');
        }, error => {
          if (typeof error.error === 'string') {
            this.notification.create('error', 'Error al anular', error.error);
          } else {
            this.notification.create('error', 'Error al anular', error.message);
          }
          console.log(error);
        });
      }
    });
  }

  aprobarPedido(pedido: PedidoProveedorDTO) {
    const dnow: Date = new Date(Date.now());
    const da: Date = new Date(dnow.getFullYear(), dnow.getMonth(), dnow.getDate(), 0, 0, 0);
    this.pedidosProveedoresSrv.postAprobacion(pedido.idpedido, 1, da).subscribe(() => {
      this.cargarPedidosProveedores();
      this.notification.create('success', 'Pedido aprobado', '');
    }, (err) => {
      if (typeof err.error === 'string') {
        this.notification.create('error', 'Error al aprobar', err.error);
      } else {
        this.notification.create('error', 'Error al aprobar', err.message);
      }
    });
  }

}
