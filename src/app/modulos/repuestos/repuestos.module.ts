import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaRepuestosComponent } from './componentes/vista-repuestos/vista-repuestos.component';
import { FormRepuestoComponent } from './componentes/form-repuesto/form-repuesto.component';
import { RepuestosRoutingModule } from './repuestos-routing.module';
import { NgZorroAntdModule, NZ_I18N, es_ES, NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RepuestosService } from './../../services/repuestos.service';
import { LOCALE_ID } from '@angular/core';

@NgModule({
  declarations: [VistaRepuestosComponent, FormRepuestoComponent],
  imports: [
    CommonModule,
    RepuestosRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES },
    RepuestosService,
    NzModalService,
    NzNotificationService,
    { provide: LOCALE_ID, useValue: 'es_PY'}
  ]
})
export class RepuestosModule { }
