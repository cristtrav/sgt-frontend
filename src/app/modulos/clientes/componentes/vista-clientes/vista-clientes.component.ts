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

  pageSize = 10;
  pageIndex = 1;
  totalConsulta = 1;
  tableLoading = false;

  @ViewChild(FormClienteComponent, { static: false })
  formComponent: FormClienteComponent;

  constructor(private clientesSrv: ClientesService,
              private notification: NzNotificationService,
              private modal: NzModalService) { }

  ngOnInit() {
    this.cargarClientes();
    this.cargarTotalClientes();
  }

  cargarTotalClientes() {
    this.clientesSrv.getTotal().subscribe((data) => {
      this.totalConsulta = data;
    }, (err) => {
      console.log(err);
    });
  }

  cargarClientes() {
    this.tableLoading = true;
    const limit = this.pageSize;
    const offset = (this.pageIndex - 1) * this.pageSize;
    this.clientesSrv.getData(limit, offset).subscribe((data) => {
      this.clientes = data;
      this.cargarTotalClientes();
      this.tableLoading = false;
    }, (err) => {
      this.tableLoading = false;
      if (typeof err.error === 'string') {
        this.notification.create('error', 'Error al cargar clientes', err.error);
      } else {
        this.notification.create('error', 'Error al cargar clientes', err.message);
      }
    });
  }

  cambioTamanioPagina() {
    this.pageIndex = 1;
    this.cargarClientes();
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
