import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaRepuestosComponent } from './componentes/vista-repuestos/vista-repuestos.component';

const routes: Routes = [
  { path: '', component: VistaRepuestosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepuestosRoutingModule { }
