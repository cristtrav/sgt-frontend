import { Component, OnInit, ViewChild } from '@angular/core';
import { FormEmpleadoComponent } from '../form-empleado/form-empleado.component';

@Component({
  selector: 'app-vista-empleados',
  templateUrl: './vista-empleados.component.html',
  styleUrls: ['./vista-empleados.component.css']
})
export class VistaEmpleadosComponent implements OnInit {

  modalFormVisible = false;
  @ViewChild(FormEmpleadoComponent, { static: false })
  formEmpleadoComponent: FormEmpleadoComponent;

  constructor() { }

  ngOnInit() {
  }

  nuevoEmpleado() {
    this.formEmpleadoComponent.nuevo();
    this.modalFormVisible = true;
  }

  cerrarModalForm() {
    this.modalFormVisible = false;
  }

  guardarEmpleado() {
    this.formEmpleadoComponent.guardar();
  }
}
