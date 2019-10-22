import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormModeloComponent } from '../form-modelo/form-modelo.component';
import { ModeloDTO } from './../../../../dto/ModeloDTO';
import { ModelosService } from './../../../../services/modelos.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-vista-modelos',
  templateUrl: './vista-modelos.component.html',
  styleUrls: ['./vista-modelos.component.css']
})
export class VistaModelosComponent implements OnInit {

  modalFormVisible = false;

  form: FormGroup;

  modelos: ModeloDTO[];

  @ViewChild(FormModeloComponent, { static: false })
  formModelo: FormModeloComponent;

  constructor(private formBuilder: FormBuilder,
              private modelosSrv: ModelosService,
              private notification: NzNotificationService,
              private modal: NzModalService) { }

  cargarModelos() {
    this.modelosSrv.getData({}).subscribe((data) => {
      this.modelos = data;
    }, (err) => {
      if (typeof err.error === 'string') {
        this.notification.create('error', 'Error al cargar modelos', err.error);
      } else {
        this.notification.create('error', 'Error al cargar modelos', err.message);
      }
    });
  }

  ngOnInit() {
    this.cargarModelos();
    this.form = this.formBuilder.group({
      id: [null, [Validators.required]],
      nombre: [null, [Validators.required, Validators.maxLength(20)]],
      idmarca: [null, [Validators.required]]
    });
  }

  nuevoModelo() {
    this.formModelo.nuevo();
    this.modalFormVisible = true;
  }

  cerrarModal() {
    this.modalFormVisible = false;
  }

  guardarModelo() {
    this.formModelo.guardar();
  }

  editarModelo(modelo: ModeloDTO) {
    this.formModelo.editar(modelo);
    this.modalFormVisible = true;
  }

  confirmarEliminacion(modelo: ModeloDTO) {
    this.modal.confirm({
      nzTitle: '<i>¿Desea eliminar el modelo?</i>',
      nzContent: `<b> ${modelo.idmodelo} - ${modelo.nombre} ${modelo.anio} (${modelo.marca}) </b>`,
      nzOkType: 'danger',
      nzOkText: 'Eliminar',
      nzWrapClassName: 'vertical-center-modal',
      nzOnOk: () => {
        this.modelosSrv.deleteData(modelo).subscribe(() => {
          this.cargarModelos();
          this.notification.create('success', 'Modelo eliminado', '');
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
