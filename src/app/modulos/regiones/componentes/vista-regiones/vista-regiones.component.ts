import { Component, OnInit } from '@angular/core';
import { RegionDTO } from '../../../../dto/RegionDTO';
import { RegionesService } from '../../../../services/regiones.service';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-vista-regiones',
  templateUrl: './vista-regiones.component.html',
  styleUrls: ['./vista-regiones.component.css']
})
export class VistaRegionesComponent implements OnInit {

  formVisible = false;

  regiones: RegionDTO[];

  regionEditar: RegionDTO;

  constructor(private regionesService: RegionesService,
    private modalSrv: NzModalService,
    private notification: NzNotificationService) {
  }

  private recargarRegiones(): void {
    this.regionesService.getData().subscribe(data => {
      this.regiones = data;
    }, error => {
      console.log('Eror al cargar');
    });
  }

  ngOnInit() {
    this.recargarRegiones();
  }

  nuevaRegion() {
    this.regionEditar = null;
    this.formVisible = true;
  }

  regionSaved() {
    console.log('region saved');
    this.recargarRegiones();
  }

  editarRegion(region: RegionDTO) {
    this.formVisible = true;
    this.regionEditar = region;
  }

  confirmarEliminacion(region: RegionDTO) {

    this.modalSrv.confirm({
      nzTitle: '<i>¿Desea eliminar la región?</i>',
      nzContent: '<b>' + region.idregion + ' - ' + region.nombre + '</b>',
      nzOkType: 'danger',
      nzOkText: 'Eliminar',
      nzWrapClassName: 'vertical-center-modal',
      nzOnOk: () => {
        this.regionesService.deleteData(region).subscribe(() => {
          this.recargarRegiones();
        }, error => {
          if (typeof error.error === 'string') {
            this.notification.create('error', 'Error al eliminar', error.error);
          } else {
            this.notification.create('error', 'Error al guardar', error.message);
          }

          console.log(error);
        });
      }
    });
  }

}
