import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaComprasComponent } from './componentes/vista-compras/vista-compras.component';
import { DetalleCompraComponent } from './componentes/detalle-compra/detalle-compra.component';

const routes: Routes = [
  { path: '', component: VistaComprasComponent },
  { path: 'detalle', component: DetalleCompraComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule { }
