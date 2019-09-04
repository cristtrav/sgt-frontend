import { Component, OnInit } from '@angular/core';
import { CiudadDTO } from './../../../../dto/CiudadDTO';
import { CiudadesService } from './../../../../services/ciudades.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-vista-ciudades',
  templateUrl: './vista-ciudades.component.html',
  styleUrls: ['./vista-ciudades.component.css']
})
export class VistaCiudadesComponent implements OnInit {

  formCiudadVisible = false;
  ciudades: CiudadDTO[];
  ciudadEdit: CiudadDTO;

  constructor(
    private ciudadesSrv: CiudadesService,
    private notification: NzNotificationService,
    private modal: NzModalService) { }

  ngOnInit() {
    this.cargarCiudades();
  }

  cargarCiudades(): void {
    this.ciudadesSrv.getData().subscribe((data) => {
      this.ciudades = data;
    }, (error) => {
      console.log(error);
      if (typeof error.error === 'string') {
        this.notification.create('error', 'Error al cargar ciudades', error.error);
      } else {
        this.notification.create('error', 'Error al cargar ciudades', error.message);
      }
    });
  }


  editarCiudad(ciudad: CiudadDTO) {
    this.ciudadEdit = ciudad;
    this.formCiudadVisible = true;
  }

  nuevaCiudad() {
    this.ciudadEdit = null;
    this.formCiudadVisible = true;
  }

  confirmarEliminacion(ciudad: CiudadDTO) {
    this.modal.confirm({
      nzTitle: '<i>¿Desea eliminar la ciudad?</i>',
      nzContent: '<b>' + ciudad.idciudad + ' - ' + ciudad.nombre + '</b>',
      nzOkType: 'danger',
      nzOkText: 'Eliminar',
      nzWrapClassName: 'vertical-center-modal',
      nzOnOk: () => {
        this.ciudadesSrv.deleteData(ciudad).subscribe(() => {
          this.cargarCiudades();
          this.notification.create('success', 'Ciudad eliminada', '');
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
