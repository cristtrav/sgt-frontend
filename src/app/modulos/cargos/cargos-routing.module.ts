import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VistaCargosComponent } from './componentes/vista-cargos/vista-cargos.component';

const routes: Routes = [
  { path: '', component: VistaCargosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargosRoutingModule { }
