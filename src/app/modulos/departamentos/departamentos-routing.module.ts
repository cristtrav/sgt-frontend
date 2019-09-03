import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VistaDepartamentosComponent } from './componentes/vista-departamentos/vista-departamentos.component';

const routes: Routes = [
  {path: '', component: VistaDepartamentosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartamentosRoutingModule { }
