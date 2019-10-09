import { Component, OnInit, ViewChild } from '@angular/core';
import { FormEmpleadoComponent } from '../form-empleado/form-empleado.component';
import { FuncionarioDTO } from './../../../../dto/FuncionarioDTO';
import { FuncionariosService } from './../../../../services/funcionarios.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-vista-empleados',
  templateUrl: './vista-empleados.component.html',
  styleUrls: ['./vista-empleados.component.css']
})
export class VistaEmpleadosComponent implements OnInit {

  modalFormVisible = false;
  funcionarios: FuncionarioDTO[];

  @ViewChild(FormEmpleadoComponent, { static: false })
  formEmpleadoComponent: FormEmpleadoComponent;

  constructor(private funcionariosSrv: FuncionariosService,
              private notification: NzNotificationService,
              private modal: NzModalService) { }

  ngOnInit() {
    this.cargarFuncionarios();
  }

  cargarFuncionarios() {
    this.funcionariosSrv.getData().subscribe((data) => {
      this.funcionarios = data;
    }, (err) => {
      if (typeof err.error === 'string') {
        this.notification.create('error', 'Error al cargar empleados', err.error);
      } else {
        this.notification.create('error', 'Error al cargar empleados', err.message);
      }
    });
  }

  nuevoEmpleado() {
    this.formEmpleadoComponent.nuevo();
    this.modalFormVisible = true;
  }

  cerrarModalForm() {
    this.modalFormVisible = false;
  }

  guardarEmpleado() {
    this.formEmpleadoComponent.guardar();
  }

  editarFuncionario(funcionario: FuncionarioDTO) {
    this.formEmpleadoComponent.cargarDatos(funcionario);
    this.modalFormVisible = true;
  }

  confirmarEliminacion(funcionario: FuncionarioDTO) {
    this.modal.confirm({
      nzTitle: '<i>¿Desea eliminar al empleado?</i>',
      nzContent: `<b> ${funcionario.idfuncionario} - ${funcionario.nombres} ${funcionario.apellidos} (CI: ${funcionario.ci}) </b>`,
      nzOkType: 'danger',
      nzOkText: 'Eliminar',
      nzWrapClassName: 'vertical-center-modal',
      nzOnOk: () => {
        this.funcionariosSrv.deleteData(funcionario).subscribe(() => {
          this.cargarFuncionarios();
          this.notification.create('success', 'Empleado eliminado', '');
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
