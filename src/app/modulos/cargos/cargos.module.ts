import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VistaCargosComponent } from './componentes/vista-cargos/vista-cargos.component';
import { FormCargoComponent } from './componentes/form-cargo/form-cargo.component';
import { CargosRoutingModule } from './cargos-routing.module';
import { NgZorroAntdModule, NZ_I18N, es_ES } from 'ng-zorro-antd';

@NgModule({
  declarations: [VistaCargosComponent, FormCargoComponent],
  imports: [
    CommonModule,
    CargosRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: es_ES }]
})
export class CargosModule { }
