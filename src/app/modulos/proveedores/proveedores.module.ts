import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaProveedoresComponent } from './componentes/vista-proveedores/vista-proveedores.component';
import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { NgZorroAntdModule, NzNotificationService } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProveedoresService } from './../../services/proveedores.service';
import { FormProveedorComponent } from './componentes/form-proveedor/form-proveedor.component';

@NgModule({
  declarations: [VistaProveedoresComponent, FormProveedorComponent],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [VistaProveedoresComponent],
  providers: [NzNotificationService, ProveedoresService]
})
export class ProveedoresModule { }
