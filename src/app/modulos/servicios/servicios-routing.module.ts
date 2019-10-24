import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { VistaServiciosComponent } from './componentes/vista-servicios/vista-servicios.component';

const routes: Routes = [
  { path: '', component: VistaServiciosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule { }
