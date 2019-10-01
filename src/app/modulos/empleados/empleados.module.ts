import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaEmpleadosComponent } from './componentes/vista-empleados/vista-empleados.component';
import { FormEmpleadoComponent } from './componentes/form-empleado/form-empleado.component';
import { EmpleadosRoutingModule } from './empleados-routing.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VistaEmpleadosComponent, FormEmpleadoComponent],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    NgZorroAntdModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class EmpleadosModule { }
