import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaModelosComponent } from './componentes/vista-modelos/vista-modelos.component';
import { FormModeloComponent } from './componentes/form-modelo/form-modelo.component';
import { ModelosRoutingModule } from './modelos-routing.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VistaModelosComponent, FormModeloComponent],
  imports: [
    CommonModule,
    ModelosRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ModelosModule { }
