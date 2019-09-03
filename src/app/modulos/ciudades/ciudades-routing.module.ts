import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaCiudadesComponent } from './componentes/vista-ciudades/vista-ciudades.component';

const routes: Routes = [
  { path: '', component: VistaCiudadesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CiudadesRoutingModule { }
