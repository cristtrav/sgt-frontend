import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VistaRegionesComponent } from './componentes/vista-regiones/vista-regiones.component';

const routes: Routes = [
  {path: '', component: VistaRegionesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionesRoutingModule { }
