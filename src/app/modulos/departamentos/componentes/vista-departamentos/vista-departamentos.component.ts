import { Component, OnInit } from '@angular/core';
import { DepartamentoDTO } from './../../../../dto/DepartamentoDTO';
import { DepartamentosService } from './../../../../services/departamentos.service';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-vista-departamentos',
  templateUrl: './vista-departamentos.component.html',
  styleUrls: ['./vista-departamentos.component.css']
})
export class VistaDepartamentosComponent implements OnInit {

  departamentos: DepartamentoDTO[];
  isFormVisible: boolean;
  departamentoEdit: DepartamentoDTO;

  constructor(private departamentosSrv: DepartamentosService,
              private modalSrv: NzModalService,
              private nzNotificationSrv: NzNotificationService) { }

  ngOnInit() {
    this.getDepartamentos();
  }

  nuevoDepartamento(): void {
    this.departamentoEdit = null;
    this.isFormVisible = true;
  }

  private getDepartamentos(): void {
    this.departamentosSrv.getData().subscribe((data: DepartamentoDTO[]) => {
      this.departamentos = data;
    }, error => {
      console.log('Error al consultar departamentos');
    });
  }

  handleSave() {
    this.getDepartamentos();
    console.log('Se recibio notificacion de guardado');
  }

  editarDepartamento(departamento: DepartamentoDTO) {
    this.departamentoEdit = departamento;
    this.isFormVisible = true;
  }

  confirmarEliminacion(departamento: DepartamentoDTO) {

    this.modalSrv.confirm({
      nzTitle: '<i>¿Desea eliminar la región?</i>',
      nzContent: '<b>' + departamento.idregion + ' - ' + departamento.nombre + '</b>',
      nzOkType: 'danger',
      nzOkText: 'Eliminar',
      nzWrapClassName: 'vertical-center-modal',
      nzOnOk: () => {
        this.departamentosSrv.deleteData(departamento).subscribe(() => {
          this.getDepartamentos();
        }, error => {
          if (typeof error.error === 'string') {
            this.nzNotificationSrv.create('error', 'Error al guardar', error.error);
          } else {
            this.nzNotificationSrv.create('error', 'Error al guardar', error.error);
          }
          console.log(error);
        });
      }
    });
  }

}
