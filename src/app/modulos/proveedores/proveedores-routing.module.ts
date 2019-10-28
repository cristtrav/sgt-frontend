import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaProveedoresComponent } from './componentes/vista-proveedores/vista-proveedores.component';

const routes: Routes = [
  {path: '', component: VistaProveedoresComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedoresRoutingModule { }
