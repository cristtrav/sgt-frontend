import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaVehiculosComponent } from './componentes/vista-vehiculos/vista-vehiculos.component';
import { Routes, RouterModule, Router } from '@angular/router';

const routes: Routes = [
  {path: '', component: VistaVehiculosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculosRoutingModule { }
