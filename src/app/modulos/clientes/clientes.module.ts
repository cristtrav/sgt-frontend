import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaClientesComponent } from './componentes/vista-clientes/vista-clientes.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { FormClienteComponent } from './componentes/form-cliente/form-cliente.component';
import { NgZorroAntdModule, NzNotificationService } from 'ng-zorro-antd';
import { CiudadesService } from './../../services/ciudades.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientesService } from './../../services/clientes.service';

@NgModule({
  declarations: [VistaClientesComponent, FormClienteComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [VistaClientesComponent],
  providers: [
    CiudadesService,
    ClientesService,
    NzNotificationService
  ]
})
export class ClientesModule { }
