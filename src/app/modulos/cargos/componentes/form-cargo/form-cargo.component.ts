import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgControlStatus } from '@angular/forms';
import { CargoDTO } from 'src/app/dto/CargoDTO';
import { CargosService } from './../../../../services/cargos.service';

@Component({
  selector: 'app-form-cargo',
  templateUrl: './form-cargo.component.html',
  styleUrls: ['./form-cargo.component.css']
})
export class FormCargoComponent implements OnInit {

  form: FormGroup;
  modoModificar = false;

  msgVisible = false;
  msg = '';
  msgDescription = '';
  msgType = 'success';

  @Output()
  saved: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private cargosSrv: CargosService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.maxLength(45)]]
    });
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

  toDto(): CargoDTO {
    const cargo: CargoDTO = new CargoDTO();
    cargo.idcargo = this.form.get('id').value;
    cargo.nombre = this.form.get('nombre').value;
    return cargo;
  }

  guardar() {
    if (this.validar()) {
      if (!this.modoModificar) {
        this.crearCargo(this.toDto());
      } else {
        this.modificarCargo(this.toDto());
      }
    }
  }

  private crearCargo(cargo: CargoDTO) {
    this.cargosSrv.postData(this.toDto()).subscribe(() => {
      this.msgType = 'success';
      this.msg = 'Guardado correctamente';
      this.msgDescription = '';
      this.msgVisible = true;
      this.form.reset();
      this.saved.emit();
    }, (err) => {
      this.msgType = 'error';
      this.msg = 'Error al guardar';
      this.msgVisible = true;
      if (typeof err.error === 'string') {
        this.msgDescription = err.error;
      } else {
        this.msgDescription = err.message;
      }
    });
  }

  private modificarCargo(cargo: CargoDTO) {
    this.cargosSrv.putData(this.toDto()).subscribe(() => {
      this.msgType = 'success';
      this.msg = 'Guardado correctamente';
      this.msgDescription = '';
      this.msgVisible = true;
      this.saved.emit();
    }, (err) => {
      this.msgType = 'error';
      this.msg = 'Error al guardar';
      this.msgVisible = true;
      if (typeof err.error === 'string') {
        this.msgDescription = err.error;
      } else {
        this.msgDescription = err.message;
      }
    });
  }

  handleAlertClose() {
    this.msgVisible = false;
  }

  cargarDatos(cargo: CargoDTO) {
    this.modoModificar = true;
    this.form.get('id').setValue(cargo.idcargo);
    this.form.get('nombre').setValue(cargo.nombre);
  }

  nuevo() {
    this.modoModificar = false;
  }
}
