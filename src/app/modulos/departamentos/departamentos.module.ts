import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaDepartamentosComponent } from './componentes/vista-departamentos/vista-departamentos.component';
import { DepartamentosRoutingModule } from './departamentos-routing.module';
import { NgZorroAntdModule, NZ_I18N, es_ES } from 'ng-zorro-antd';
import { DepartamentosService } from './../../services/departamentos.service';
import { FormDepartamentoComponent } from './componentes/form-departamento/form-departamento.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@NgModule({
  declarations: [VistaDepartamentosComponent, FormDepartamentoComponent],
  imports: [
    CommonModule,
    DepartamentosRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [VistaDepartamentosComponent],
  providers: [{ provide: NZ_I18N, useValue: es_ES }, DepartamentosService, NzNotificationService]
})
export class DepartamentosModule { }
