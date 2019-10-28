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
      nzTitle: '<i>¿Desea eliminar el pedido?</i>',
      nzContent: `<b> Código ${pedido.idpedido}. Proveedor: ${pedido.proveedor}. Monto: ${pedido.total} </b>`,
      nzOkType: 'danger',
      nzOkText: 'Eliminar',
      nzWrapClassName: 'vertical-center-modal',
      nzOnOk: () => {
        this.pedidosProveedoresSrv.deleteData(pedido).subscribe(() => {
          this.cargarPedidosProveedores();
          this.notification.create('success', 'Pedido eliminado', '');
        }, error => {
          if (typeof error.error === 'string') {
            this.notification.create('error', 'Error al eliminar', error.error);
          } else {
            this.notification.create('error', 'Error al eliminar', error.message);
          }
          console.log(error);
        });
      }
    });
  }

}
