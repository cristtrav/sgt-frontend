import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaComprasComponent } from './componentes/vista-compras/vista-compras.component';
import { ComprasRoutingModule } from './compras-routing.module';
import { NgZorroAntdModule, NZ_I18N, es_ES, NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalleCompraComponent } from './componentes/detalle-compra/detalle-compra.component';
import { PedidosproveedoresService } from './../../services/pedidosproveedores.service';
import { ProveedoresService } from './../../services/proveedores.service';
import { ComprasService } from './../../services/compras.service';

@NgModule({
  declarations: [VistaComprasComponent, DetalleCompraComponent],
  imports: [
    CommonModule,
    ComprasRoutingModule,
    NgZorroAntdModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES },
    NzNotificationService,
    NzModalService,
    { provide: LOCALE_ID, useValue: 'es_PY'},
    PedidosproveedoresService,
    ProveedoresService,
    ComprasService
  ]
})
export class ComprasModule { }
