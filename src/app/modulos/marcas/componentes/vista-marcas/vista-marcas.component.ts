import { Component, OnInit, ViewChild } from '@angular/core';
import { FormMarcaComponent } from './../form-marca/form-marca.component';
import { MarcaDTO } from './../../../../dto/MarcaDTO';
import { MarcasService } from './../../../../services/marcas.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-vista-marcas',
  templateUrl: './vista-marcas.component.html',
  styleUrls: ['./vista-marcas.component.css']
})
export class VistaMarcasComponent implements OnInit {

  marcas: MarcaDTO[];

  formVisible = false;

  @ViewChild(FormMarcaComponent, { static: false })
  formMarca: FormMarcaComponent;

  constructor(private marcasSrv: MarcasService,
              private notification: NzNotificationService,
              private modal: NzModalService) { }

  cargarMarcas() {
    this.marcasSrv.getData().subscribe((data) => {
      this.marcas = data;
    }, (err) => {
      if (typeof err.error === 'string') {
        this.notification.create('error', 'Error al cargar marcas', err.error);
      } else {
        this.notification.create('error', 'Error al cargar marcas', err.message);
      }
    });
  }

  ngOnInit() {
    this.cargarMarcas();
  }

  nuevaMarca() {
    this.formMarca.nuevo();
    this.formVisible = true;
  }

  cerrarForm() {
    this.formVisible = false;
  }

  guardarMarca() {
    this.formMarca.guardar();
  }

  editarMarca(marca: MarcaDTO) {
    this.formMarca.editarMarca(marca);
    this.formVisible = true;
  }

  confirmarEliminacion(marca: MarcaDTO) {
    this.modal.confirm({
      nzTitle: '<i>¿Desea eliminar la marca?</i>',
      nzContent: '<b>' + marca.idmarca + ' - ' + marca.nombre + '</b>',
      nzOkType: 'danger',
      nzOkText: 'Eliminar',
      nzWrapClassName: 'vertical-center-modal',
      nzOnOk: () => {
        this.marcasSrv.deleteData(marca).subscribe(() => {
          this.cargarMarcas();
          this.notification.create('success', 'Marca eliminada', '');
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
