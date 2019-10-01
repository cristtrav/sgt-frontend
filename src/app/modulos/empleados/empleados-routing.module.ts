import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VistaEmpleadosComponent } from './componentes/vista-empleados/vista-empleados.component';

const routes: Routes = [
  {path: '', component: VistaEmpleadosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
