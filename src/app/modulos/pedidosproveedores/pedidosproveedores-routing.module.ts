import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaPedidosproveedoresComponent } from './componentes/vista-pedidosproveedores/vista-pedidosproveedores.component';
import { DetallepedidoproveedorComponent } from './componentes/detallepedidoproveedor/detallepedidoproveedor.component';

const routes: Routes = [
  { path: '', component: VistaPedidosproveedoresComponent },
  { path: ':detallepedido', component: DetallepedidoproveedorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosproveedoresRoutingModule { }
