import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaComprasComponent } from './componentes/vista-compras/vista-compras.component';

const routes: Routes = [
  { path: '', component: VistaComprasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule { }
