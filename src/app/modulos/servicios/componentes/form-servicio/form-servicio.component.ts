import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicioDTO } from './../../../../dto/ServicioDTO';
import { ServiciosService } from './../../../../services/servicios.service';

@Component({
  selector: 'app-form-servicio',
  templateUrl: './form-servicio.component.html',
  styleUrls: ['./form-servicio.component.css']
})
export class FormServicioComponent implements OnInit {

  modoModificar = false;
  form: FormGroup;

  msgVisible = false;
  msg = '';
  msgDescription = '';
  msgType = 'success';

  @Output()
  saved: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private serviciosSrv: ServiciosService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [null, [Validators.required]],
      nombre: [null, [Validators.required]],
      precio: [null, [Validators.required]],
      iva: ['10', [Validators.required]]
    });
  }

  nuevo() {
    this.msgVisible = false;
    this.form.reset();
    this.form.get('iva').setValue('10');
  }

  guardar() {
    console.log('guardando...');
    if (this.validar()) {
      if (this.modoModificar) {
        this.modificar();
      } else {
        this.crear();
      }
    }
  }

  private crear() {
    this.serviciosSrv.postData(this.getDto()).subscribe(() => {
      this.form.reset();
      this.msgVisible = true;
      this.msgType = 'success';
      this.msgDescription = '';
      this.msg = 'Guardado correctamente';
      this.saved.emit();
    }, (err) => {
      this.msgType = 'error';
      this.msg = 'Error al guardar';
      if (typeof err.error === 'string') {
        this.msgDescription = err.error;
      } else {
        this.msgDescription = err.message;
      }
      this.msgVisible = true;
    });
  }

  private modificar() {
    this.serviciosSrv.putData(this.getDto()).subscribe(() => {
      this.msgVisible = true;
      this.msgType = 'success';
      this.msgDescription = '';
      this.msg = 'Guardado correctamente';
      this.saved.emit();
    }, (err) => {
      this.msgType = 'error';
      this.msg = 'Error al guardar';
      if (typeof err.error === 'string') {
        this.msgDescription = err.error;
      } else {
        this.msgDescription = err.message;
      }
      this.msgVisible = true;
    });
  }

  private getDto(): ServicioDTO {
    const servicio: ServicioDTO = new ServicioDTO();
    servicio.idservicio = this.form.get('id').value;
    servicio.nombre = this.form.get('nombre').value;
    servicio.precio = this.form.get('precio').value;
    servicio.iva = this.form.get('iva').value;
    return servicio;
  }

  private validar(): boolean {
    let validado = true;
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      control.markAsDirty();
      control.updateValueAndValidity();
      validado = validado && control.valid;
    });
    return validado;
  }

  handleAlertClose() {
    this.msgVisible = false;
  }

  editarServicio(servicio: ServicioDTO) {
    this.form.get('id').setValue(servicio.idservicio);
    this.form.get('nombre').setValue(servicio.nombre);
    this.form.get('precio').setValue(servicio.precio);
    this.form.get('iva').setValue(servicio.iva.toString());
    this.modoModificar = true;
  }
}
