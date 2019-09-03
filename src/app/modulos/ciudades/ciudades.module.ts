import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaCiudadesComponent } from './componentes/vista-ciudades/vista-ciudades.component';
import { CiudadesRoutingModule } from './ciudades-routing.module';
import { NgZorroAntdModule, NZ_I18N, es_ES } from 'ng-zorro-antd';
import { CiudadesService } from './../../services/ciudades.service';
import { DepartamentosService } from './../../services/departamentos.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { FormCiudadComponent } from './componentes/form-ciudad/form-ciudad.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VistaCiudadesComponent, FormCiudadComponent],
  imports: [
    CiudadesRoutingModule,
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [VistaCiudadesComponent],
  providers: [{ provide: NZ_I18N, useValue: es_ES }, CiudadesService, NzNotificationService, DepartamentosService]
})
export class CiudadesModule { }
