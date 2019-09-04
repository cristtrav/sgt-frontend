import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaClientesComponent } from './componentes/vista-clientes/vista-clientes.component';

const routes: Routes = [
  { path: '', component: VistaClientesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
