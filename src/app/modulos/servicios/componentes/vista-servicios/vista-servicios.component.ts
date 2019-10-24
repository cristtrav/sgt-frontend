import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicioDTO } from './../../../../dto/ServicioDTO';
import { ServiciosService } from './../../../../services/servicios.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { FormServicioComponent } from './../form-servicio/form-servicio.component';

@Component({
  selector: 'app-vista-servicios',
  templateUrl: './vista-servicios.component.html',
  styleUrls: ['./vista-servicios.component.css']
})
export class VistaServiciosComponent implements OnInit {

  constructor(private serviciosSrv: ServiciosService,
              private notification: NzNotificationService,
              private modal: NzModalService) { }

  servicios: ServicioDTO[];
  modalFormVisible = false;

  @ViewChild(FormServicioComponent, { static: false })
  formServicioComponent: FormServicioComponent;

  ngOnInit() {
    this.cargarServicios();
  }

  cargarServicios() {
    this.serviciosSrv.getData().subscribe((data) => {
      this.servicios = data;
    }, (err) => {
      if (typeof err.error === 'string') {
        this.notification.create('error', 'Error al cargar servicios', err.error);
      } else {
        this.notification.create('error', 'Error al cargar servicios', err.message);
      }
    });
  }

  nuevoServicio() {
    this.formServicioComponent.nuevo();
    this.modalFormVisible = true;
  }

  cerrarModalForm() {
    this.modalFormVisible = false;
  }

  guardarServicio() {
    this.formServicioComponent.guardar();
  }

  editarServicio(servicio: ServicioDTO) {
    this.formServicioComponent.editarServicio(servicio);
    this.modalFormVisible = true;
  }

  confirmarEliminacion(servicio: ServicioDTO) {
    this.modal.confirm({
      nzTitle: '<i>¿Desea eliminar el servicio?</i>',
      nzContent: `<b> ${servicio.idservicio} - ${servicio.nombre} </b>`,
      nzOkType: 'danger',
      nzOkText: 'Eliminar',
      nzWrapClassName: 'vertical-center-modal',
      nzOnOk: () => {
        this.serviciosSrv.deleteData(servicio).subscribe(() => {
          this.cargarServicios();
          this.notification.create('success', 'Servicio eliminado', '');
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
