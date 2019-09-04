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

  pageSize = 10;
  pageIndex = 1;
  totalCiudades = 20;
  tableLoading = false;

  formCiudadVisible = false;
  ciudades: CiudadDTO[];
  ciudadEdit: CiudadDTO;

  constructor(
    private ciudadesSrv: CiudadesService,
    private notification: NzNotificationService,
    private modal: NzModalService) { }

  ngOnInit() {
    this.cargarCiudades();
    this.cargarTotalCiudades();
  }

  private cargarTotalCiudades() {
    this.ciudadesSrv.getTotal().subscribe((data) => {
      this.totalCiudades = data;
    }, (err) => {
      console.log(err);
    });
  }

  cargarCiudades(): void {
    this.tableLoading = true;
    const limit = this.pageSize;
    const offset = (this.pageIndex - 1) * this.pageSize;
    this.ciudadesSrv.getData(limit, offset).subscribe((data) => {
      this.ciudades = data;
      this.tableLoading = false;
      this.cargarTotalCiudades();
    }, (error) => {
      this.tableLoading = false;
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
