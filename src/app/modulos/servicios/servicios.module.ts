import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaServiciosComponent } from './componentes/vista-servicios/vista-servicios.component';
import { FormServicioComponent } from './componentes/form-servicio/form-servicio.component';
import { ServiciosRoutingModule } from './servicios-routing.module';
import { NgZorroAntdModule, NZ_I18N, es_ES, NzNotificationService } from 'ng-zorro-antd';
import { ServiciosService } from './../../services/servicios.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VistaServiciosComponent, FormServicioComponent],
  imports: [
    CommonModule,
    ServiciosRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES },
    NzNotificationService,
    ServiciosService
  ]
})
export class ServiciosModule { }
