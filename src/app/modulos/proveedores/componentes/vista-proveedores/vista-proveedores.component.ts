import { Component, OnInit, ViewChild } from '@angular/core';
import { ProveedorDTO } from './../../../../dto/ProveedorDTO';
import { ProveedoresService } from './../../../../services/proveedores.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { FormProveedorComponent } from './../form-proveedor/form-proveedor.component';

@Component({
  selector: 'app-vista-proveedores',
  templateUrl: './vista-proveedores.component.html',
  styleUrls: ['./vista-proveedores.component.css']
})
export class VistaProveedoresComponent implements OnInit {

  formVisible = false;
  tituloModal = 'Nuevo Proveedor';

  proveedores: ProveedorDTO[];

  @ViewChild(FormProveedorComponent, { static: false })
  formProveedor: FormProveedorComponent;

  constructor(private proveedoresSrv: ProveedoresService,
              private notification: NzNotificationService,
              private modal: NzModalService) { }

  cargarProveedores() {
    this.proveedoresSrv.getData().subscribe((data) => {
      this.proveedores = data;
    }, (error) => {
      if (typeof error.error === 'string') {
        this.notification.create('error', 'Error al cargar proveedores', error.error);
      } else {
        this.notification.create('error', 'Error al cargar proveedores', error.message);
      }
    });
  }

  ngOnInit() {
    this.cargarProveedores();
  }

  nuevoProveedor(): void {
    this.formProveedor.nuevo();
    this.formVisible = true;
  }

  cerrarForm(): void {
    this.formVisible = false;
  }

  guardarProveedor(): void {
    this.formProveedor.guardar();
  }

  formatDate(strDate: string): string {
    const date: Date = new Date(strDate);
    let strFi = date.getDate().toString().padStart(2, '0');
    strFi += '-' + (date.getMonth() + 1).toString().padStart(2, '0');
    strFi += '-' + date.getFullYear().toString();
    return strFi;
  }

  editarProveedor(proveedor: ProveedorDTO): void {
    this.formProveedor.editar(proveedor);
    this.formVisible = true;
  }

  confirmarEliminacion(proveedor: ProveedorDTO) {
    this.modal.confirm({
      nzTitle: '<i>¿Desea eliminar el proveedor?</i>',
      nzContent: '<b>' + proveedor.idproveedor + ' - ' + proveedor.razonsocial + '</b>',
      nzOkType: 'danger',
      nzOkText: 'Eliminar',
      nzWrapClassName: 'vertical-center-modal',
      nzOnOk: () => {
        this.proveedoresSrv.deleteData(proveedor).subscribe(() => {
          this.cargarProveedores();
          this.notification.create('success', 'Proveedor eliminado', '');
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
