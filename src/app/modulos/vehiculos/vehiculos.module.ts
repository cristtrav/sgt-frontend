import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaVehiculosComponent } from './componentes/vista-vehiculos/vista-vehiculos.component';
import { FormVehiculoComponent } from './componentes/form-vehiculo/form-vehiculo.component';
import { NgZorroAntdModule, NZ_I18N, es_ES, NzNotificationService } from 'ng-zorro-antd';
import { VehiculosRoutingModule } from './vehiculos-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientesService } from './../../services/clientes.service';
import { CargosService } from 'src/app/services/cargos.service';
import { MarcasService } from './../../services/marcas.service';
import { VehiculosService } from './../../services/vehiculos.service';


@NgModule({
  declarations: [VistaVehiculosComponent, FormVehiculoComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    VehiculosRoutingModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES },
    NzNotificationService,
    CargosService,
    ClientesService,
    MarcasService,
    VehiculosService
  ]
})
export class VehiculosModule { }
