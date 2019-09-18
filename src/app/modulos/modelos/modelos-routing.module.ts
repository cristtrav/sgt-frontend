import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaModelosComponent } from './componentes/vista-modelos/vista-modelos.component';

const routes: Routes = [
  { path: '', component: VistaModelosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelosRoutingModule { }
