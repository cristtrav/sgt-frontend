import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaPedidosproveedoresComponent } from './componentes/vista-pedidosproveedores/vista-pedidosproveedores.component';
import { PedidosproveedoresRoutingModule } from './pedidosproveedores-routing.module';
import { NgZorroAntdModule, NZ_I18N, es_ES, NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { DetallepedidoproveedorComponent } from './componentes/detallepedidoproveedor/detallepedidoproveedor.component';
import { RepuestosService } from './../../services/repuestos.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProveedoresService } from './../../services/proveedores.service';
import { LOCALE_ID } from '@angular/core';

@NgModule({
  declarations: [VistaPedidosproveedoresComponent, DetallepedidoproveedorComponent],
  imports: [
    CommonModule,
    PedidosproveedoresRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES },
    NzNotificationService,
    NzModalService,
    RepuestosService,
    ProveedoresService,
    { provide: LOCALE_ID, useValue: 'es_PY'}
  ]
})
export class PedidosproveedoresModule { }
