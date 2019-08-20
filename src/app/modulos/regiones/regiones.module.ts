import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule, NZ_I18N, es_ES } from 'ng-zorro-antd';
import { RegionesRoutingModule } from './regiones-routing.module';
import { VistaRegionesComponent } from './componentes/vista-regiones/vista-regiones.component';
import { FormRegionComponent } from './componentes/form-region/form-region.component';
import { RegionesService } from '../../services/regiones.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [VistaRegionesComponent, FormRegionComponent],
  imports: [
    NgZorroAntdModule,
    RegionesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  exports: [VistaRegionesComponent],
  providers: [{ provide: NZ_I18N, useValue: es_ES }, RegionesService]
})
export class RegionesModule { }
