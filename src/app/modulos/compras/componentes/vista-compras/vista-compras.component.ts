import { Component, OnInit } from '@angular/core';
import { CompraDTO } from './../../../../dto/CompraDTO';
import { ComprasService } from './../../../../services/compras.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-vista-compras',
  templateUrl: './vista-compras.component.html',
  styleUrls: ['./vista-compras.component.css']
})
export class VistaComprasComponent implements OnInit {

  compras: CompraDTO[];

  constructor(private comprasSrv: ComprasService,
              private notification: NzNotificationService,
              private modal: NzModalService) { }

  ngOnInit() {
    this.cargarCompras();
  }

  cargarCompras() {
    this.comprasSrv.getData().subscribe((data) => {
      this.compras = data;
    }, (err) => {
      this.notification.create('error', 'Error al cargar compras', typeof err.error === 'string' ? err.error : err.message);
    });
  }

  formatDate(strdate: string): string {
    const date = new Date(strdate);
    let ff = date.getDate().toString().padStart(2, '0');
    ff += '-' + (date.getMonth() + 1).toString().padStart(2, '0');
    ff += '-' + date.getFullYear();
    return ff;
  }

  confirmarAnulacion(compra: CompraDTO) {
    this.modal.confirm({
      nzTitle: '<i>¿Desea anular la compra?</i>',
      nzContent: `<b> Código ${compra.idcompra}. Proveedor: ${compra.proveedor}. Monto: ${compra.total} </b>`,
      nzOkType: 'danger',
      nzOkText: 'Anular',
      nzWrapClassName: 'vertical-center-modal',
      nzOnOk: () => {
        this.comprasSrv.postAnulacion(compra).subscribe(() => {
          this.cargarCompras();
          this.notification.create('success', 'Compra anulada', '');
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

}
