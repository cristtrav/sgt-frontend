import { Component, OnInit, ViewChild } from '@angular/core';
import { VehiculoDTO } from './../../../../dto/VehiculoDTO';
import { FormVehiculoComponent } from './../form-vehiculo/form-vehiculo.component';
import { VehiculosService } from './../../../../services/vehiculos.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-vista-vehiculos',
  templateUrl: './vista-vehiculos.component.html',
  styleUrls: ['./vista-vehiculos.component.css']
})
export class VistaVehiculosComponent implements OnInit {

  modalFormVisible = false;

  vehiculos: VehiculoDTO[];

  @ViewChild(FormVehiculoComponent, { static: false })
  formVehiculoComponent: FormVehiculoComponent;

  constructor(private vehiculosSrv: VehiculosService,
              private notification: NzNotificationService,
              private modal: NzModalService) { }

  ngOnInit() {
    this.cargarVehiculos();
  }

  cargarVehiculos() {
    this.vehiculosSrv.getData().subscribe((data) => {
      this.vehiculos = data;
    }, (err) => {
      if (typeof err.error === 'string') {
        this.notification.create('error', 'Error al cargar vehiculos', err.error);
      } else {
        this.notification.create('error', 'Error al cargar vehiculos', err.message);
      }
    });

  }

  nuevoVehiculo() {
    this.modalFormVisible = true;
    this.formVehiculoComponent.nuevoVehiculo();
  }

  cerrarModalForm() {
    this.modalFormVisible = false;
  }

  guardar() {
    this.formVehiculoComponent.guardar();
  }

  formatDate(strDate): string {
    if (strDate == null) {
      return '';
    } else {
      const date: Date = new Date(strDate);
      let fd: string = date.getDate().toString().padStart(2, '0');
      fd += '-' + ((date.getMonth() + 1) + '').padStart(2, '0');
      fd += '-' + date.getFullYear().toString();
      return fd;
    }
  }

  editarVehiculo(vehiculo: VehiculoDTO) {
    this.formVehiculoComponent.editarVehiculo(vehiculo);
    this.modalFormVisible = true;
  }

  confirmarEliminacion(vehiculo: VehiculoDTO) {
    this.modal.confirm({
      nzTitle: '<i>¿Desea eliminar el vehiculo?</i>',
      nzContent: `<b> ${vehiculo.idvehiculo} - ${vehiculo.marca} ${vehiculo.modelo} año ${vehiculo.anioModelo} de ${vehiculo.nombresPropietario} ${vehiculo.apellidosPropietario} </b>`,
      nzOkType: 'danger',
      nzOkText: 'Eliminar',
      nzWrapClassName: 'vertical-center-modal',
      nzOnOk: () => {
        this.vehiculosSrv.deleteData(vehiculo).subscribe(() => {
          this.cargarVehiculos();
          this.notification.create('success', 'Vehiculo eliminado', '');
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
