import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VistaMarcasComponent } from './componentes/vista-marcas/vista-marcas.component';
import { MarcasRoutingModule } from './marcas-routing.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormMarcaComponent } from './componentes/form-marca/form-marca.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarcasService } from './../../services/marcas.service';
@NgModule({
  declarations: [VistaMarcasComponent, FormMarcaComponent],
  imports: [
    MarcasRoutingModule,
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MarcasService]
})
export class MarcasModule { }
