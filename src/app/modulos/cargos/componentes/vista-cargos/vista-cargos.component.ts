import { Component, OnInit, ViewChild } from '@angular/core';
import { CargoDTO } from './../../../../dto/CargoDTO';
import { CargosService } from './../../../../services/cargos.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { FormCargoComponent } from './../form-cargo/form-cargo.component';

@Component({
  selector: 'app-vista-cargos',
  templateUrl: './vista-cargos.component.html',
  styleUrls: ['./vista-cargos.component.css']
})
export class VistaCargosComponent implements OnInit {

  modalFormVisible = false;
  cargos: CargoDTO[];

  @ViewChild(FormCargoComponent, { static: false })
  formCargoComponent: FormCargoComponent;

  constructor(private cargosSrv: CargosService,
              private notification: NzNotificationService,
              private modal: NzModalService) { }

  ngOnInit() {
    this.cargarCargos();
  }

  cargarCargos() {
    this.cargosSrv.getData().subscribe((data) => {
      console.log('datos cargados');
      this.cargos = data;
    }, (err) => {
      if (typeof err.error === 'string') {
        this.notification.create('error', 'Error al cargar cargos', err.error);
      } else {
        this.notification.create('error', 'Error al cargar cargos', err.message);
      }
    });
  }

  nuevoCargo() {
    this.modalFormVisible = true;
  }

  cerrarModalForm() {
    this.modalFormVisible = false;
  }

  guardarCargo() {
    this.formCargoComponent.guardar();
  }

  modificarCargo(cargo: CargoDTO) {
      this.formCargoComponent.cargarDatos(cargo);
      this.modalFormVisible = true;
  }

  confirmarEliminacion(cargo: CargoDTO) {
    this.modal.confirm({
      nzTitle: '<i>¿Desea eliminar el cargo?</i>',
      nzContent: `<b> ${cargo.idcargo} - ${cargo.nombre} </b>`,
      nzOkType: 'danger',
      nzOkText: 'Eliminar',
      nzWrapClassName: 'vertical-center-modal',
      nzOnOk: () => {
        this.cargosSrv.deleteData(cargo).subscribe(() => {
          this.cargarCargos();
          this.notification.create('success', 'Cargo eliminado', '');
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
