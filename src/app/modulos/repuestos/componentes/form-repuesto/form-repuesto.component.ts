import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RepuestosService } from './../../../../services/repuestos.service';
import { RepuestoDTO } from 'src/app/dto/RepuestoDTO';

@Component({
  selector: 'app-form-repuesto',
  templateUrl: './form-repuesto.component.html',
  styleUrls: ['./form-repuesto.component.css']
})
export class FormRepuestoComponent implements OnInit {

  modoModificar = false;

  form: FormGroup;

  msgVisible = false;
  msg = '';
  msgDescription = '';
  msgType = 'success';

  @Output()
  saved: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private repuestosSrv: RepuestosService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [null, [Validators.required]],
      nombre: [null, [Validators.required]],
      precio: [null, [Validators.required]],
      stock: [0, [Validators.required]],
      stockminimo: [0, [Validators.required]]
    });
  }

  nuevoRepuesto() {
    this.msgVisible = false;
    this.form.reset();
  }

  editarRepuesto(repuesto: RepuestoDTO) {
    this.modoModificar = true;
    this.msgVisible = false;
    this.form.get('id').setValue(repuesto.idrepuesto);
    this.form.get('nombre').setValue(repuesto.nombre);
    this.form.get('precio').setValue(repuesto.precio);
    this.form.get('stock').setValue(repuesto.stock);
    this.form.get('stockminimo').setValue(repuesto.stockMinimo);
  }

  guardar() {
    if (this.validar()) {
      if (this.modoModificar) {
        this.modificar();
      } else {
        this.crear();
      }
    }
  }

  private crear() {
    this.repuestosSrv.postData(this.getDto()).subscribe(() => {
      this.msgVisible = true;
      this.msg = 'Guardado correctamente.';
      this.msgDescription = '';
      this.msgType = 'success';
      this.form.reset();
      this.saved.emit();
    }, (err) => {
      this.msgVisible = true;
      this.msg = 'Error al guardar.';
      if (typeof err.error === 'string') {
        this.msgDescription = err.error;
      } else {
        this.msgDescription = err.message;
      }
      this.msgType = 'error';
    });
  }

  private modificar() {
    this.repuestosSrv.putData(this.getDto()).subscribe(() => {
      this.msgVisible = true;
      this.msg = 'Guardado correctamente.';
      this.msgDescription = '';
      this.msgType = 'success';
      this.saved.emit();
    }, (err) => {
      this.msgVisible = true;
      this.msg = 'Error al guardar.';
      if (typeof err.error === 'string') {
        this.msgDescription = err.error;
      } else {
        this.msgDescription = err.message;
      }
      this.msgType = 'error';
    });
  }

  private getDto(): RepuestoDTO {
    const repuesto: RepuestoDTO = new RepuestoDTO();
    repuesto.idrepuesto = this.form.get('id').value;
    repuesto.nombre = this.form.get('nombre').value;
    repuesto.precio = this.form.get('precio').value;
    repuesto.stock = this.form.get('stock').value;
    repuesto.stockMinimo = this.form.get('stockminimo').value;
    return repuesto;
  }

  private validar(): boolean {
    let validado = true;
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      validado = validado && control.valid;
      control.markAsDirty();
      control.updateValueAndValidity();
    });
    return validado;
  }

  handleAlertClose() {
    this.msgVisible = false;
  }

}
