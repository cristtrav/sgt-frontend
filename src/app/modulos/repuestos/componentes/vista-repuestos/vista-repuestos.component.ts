import { Component, OnInit, ViewChild } from '@angular/core';
import { FormRepuestoComponent } from '../form-repuesto/form-repuesto.component';
import { RepuestoDTO } from './../../../../dto/RepuestoDTO';
import { RepuestosService } from './../../../../services/repuestos.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-vista-repuestos',
  templateUrl: './vista-repuestos.component.html',
  styleUrls: ['./vista-repuestos.component.css']
})
export class VistaRepuestosComponent implements OnInit {

  modalFormVisible = false;

  repuestos: RepuestoDTO[];

  @ViewChild(FormRepuestoComponent, { static: false })
  formRepuestoComponent: FormRepuestoComponent;

  constructor(private repuestosSrv: RepuestosService,
              private notification: NzNotificationService,
              private modal: NzModalService) { }

  ngOnInit() {
    this.cargarRepuestos();
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

  nuevoRepuesto() {
    this.modalFormVisible = true;
    this.formRepuestoComponent.nuevoRepuesto();
  }

  editarRepuesto(repuesto: RepuestoDTO) {
    this.modalFormVisible = true;
    this.formRepuestoComponent.editarRepuesto(repuesto);
  }

  cerrarModalForm() {
    this.modalFormVisible = false;
  }

  confirmarEliminacion(repuesto: RepuestoDTO) {
    this.modal.confirm({
      nzTitle: '<i>¿Desea eliminar el insumo?</i>',
      nzContent: `<b> ${repuesto.idrepuesto} - ${repuesto.nombre} </b>`,
      nzOkType: 'danger',
      nzOkText: 'Eliminar',
      nzWrapClassName: 'vertical-center-modal',
      nzOnOk: () => {
        this.repuestosSrv.deleteData(repuesto).subscribe(() => {
          this.cargarRepuestos();
          this.notification.create('success', 'Insumo eliminado', '');
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
