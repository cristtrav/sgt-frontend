import { Component, OnInit, ViewChild } from '@angular/core';
import { FormClienteComponent } from '../form-cliente/form-cliente.component';
import { ClienteDTO } from './../../../../dto/ClienteDTO';
import { ClientesService } from './../../../../services/clientes.service';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-vista-clientes',
  templateUrl: './vista-clientes.component.html',
  styleUrls: ['./vista-clientes.component.css']
})
export class VistaClientesComponent implements OnInit {

  formVisible = false;
  clientes: ClienteDTO[];

  @ViewChild(FormClienteComponent, { static: false })
  formComponent: FormClienteComponent;

  constructor(private clientesSrv: ClientesService,
              private notification: NzNotificationService,
              private modal: NzModalService) { }

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clientesSrv.getData().subscribe((data) => {
      this.clientes = data;
    }, (err) => {
      if (typeof err.error === 'string') {
        this.notification.create('error', 'Error al cargar clientes', err.error);
      } else {
        this.notification.create('error', 'Error al cargar clientes', err.message);
      }
    });
  }

  nuevoCliente() {
    this.formComponent.nuevoCliente();
    this.formVisible = true;
  }

  cerrarForm() {
    this.formVisible = false;
  }

  guardarCliente() {
    this.formComponent.guardar();
  }

  editarCliente(cliente: ClienteDTO) {
    this.formComponent.editarCliente(cliente);
    this.formVisible = true;
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

  confirmarEliminacion(cliente: ClienteDTO) {
    this.modal.confirm({
      nzTitle: '<i>¿Desea eliminar el cliente?</i>',
      nzContent: '<b>' + cliente.ci + ' - ' + cliente.nombres + ' ' + cliente.apellidos + '</b>',
      nzOkType: 'danger',
      nzOkText: 'Eliminar',
      nzWrapClassName: 'vertical-center-modal',
      nzOnOk: () => {
        this.clientesSrv.deleteData(cliente).subscribe(() => {
          this.cargarClientes();
          this.notification.create('success', 'Cliente eliminado', '');
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
