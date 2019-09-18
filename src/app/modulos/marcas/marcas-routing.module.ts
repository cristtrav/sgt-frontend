import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaMarcasComponent } from './componentes/vista-marcas/vista-marcas.component';

const routes: Routes = [
  { path: '', component: VistaMarcasComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarcasRoutingModule { }
