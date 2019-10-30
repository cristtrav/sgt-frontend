import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaComprasComponent } from './componentes/vista-compras/vista-compras.component';
import { ComprasRoutingModule } from './compras-routing.module';


@NgModule({
  declarations: [VistaComprasComponent],
  imports: [
    CommonModule,
    ComprasRoutingModule
  ]
})
export class ComprasModule { }
