import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedorDTO } from './../../../../dto/ProveedorDTO';
import { ProveedoresService } from './../../../../services/proveedores.service';

@Component({
  selector: 'app-form-proveedor',
  templateUrl: './form-proveedor.component.html',
  styleUrls: ['./form-proveedor.component.css']
})
export class FormProveedorComponent implements OnInit {

  @Output()
  saved: EventEmitter<any> = new EventEmitter();

  correccionDatePicker = { width: '120%' };

  modoModificar = false;

  labelSize = 5;
  controlSize = 18;

  form: FormGroup;

  msgType = 'success';
  msg = '';
  msgDescription = '';
  msgVisible = false;

  constructor(private formBuilder: FormBuilder, private proveedoresSrv: ProveedoresService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [null, [Validators.required]],
      razonsocial: [null, [Validators.required, Validators.maxLength(80)]],
      ci: [null, [Validators.required]],
      dvruc: [null, [Validators.required]],
      telefono: [null, [Validators.maxLength(25)]],
      email: [null, [Validators.email, Validators.maxLength(80)]],
      nombrecontacto: [null, [Validators.maxLength(50)]],
      telefonocontacto: [null, [Validators.maxLength(25)]],
      fechaingreso: [new Date(), [Validators.required]],
      activo: ['1', [Validators.required]]
    });
  }

  validar(): boolean {
    let validado = true;
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      validado = validado && control.valid;
      control.markAsDirty();
      control.updateValueAndValidity();
    });
    return validado;
  }

  getDto(): ProveedorDTO {
    const proveedor: ProveedorDTO = new ProveedorDTO();
    proveedor.idproveedor = this.form.get('id').value;
    proveedor.razonsocial = this.form.get('razonsocial').value;
    proveedor.activo = this.form.get('activo').value;
    proveedor.contacto = this.form.get('nombrecontacto').value;
    proveedor.documento = this.form.get('ci').value;
    proveedor.dvRuc = this.form.get('dvruc').value;
    proveedor.telefonoContacto = this.form.get('telefonocontacto').value;
    proveedor.telefono = this.form.get('telefono').value;
    proveedor.email = this.form.get('email').value;
    proveedor.fechaIngreso = this.form.get('fechaingreso').value;
    // const fi: Date = this.form.get('fechaingreso').value;
    // let strFi = fi.getFullYear().toString();
    // strFi += '-' + (fi.getMonth() + 1).toString().padStart(2, '0');
    // strFi += '-' + fi.getDate().toString().padStart(2, '0');
    // proveedor.fechaIngreso = strFi;
    return proveedor;
  }

  guardar() {
    if (this.validar()) {
      if (this.modificar) {
        this.modificar(this.getDto());
      } else {
        this.crear(this.getDto());
      }
    } else {
      this.msgVisible = false;
    }
  }

  private crear(proveedor: ProveedorDTO): void {
    this.proveedoresSrv.postData(proveedor).subscribe(() => {
      this.msgType = 'success';
      this.msg = 'Proveedor guardado';
      this.msgDescription = '';
      this.msgVisible = true;
      this.form.reset();
      this.form.get('activo').setValue('1');
      this.form.get('fechaingreso').setValue(new Date());
      this.saved.emit();
    }, (error) => {
      console.log(error);
      this.msgType = 'error';
      this.msg = 'Error al guardar';
      if (typeof error.error === 'string') {
        this.msgDescription = error.error;
      } else {
        this.msgDescription = error.message;
      }
      this.msgVisible = true;
    });
  }

  private modificar(proveedor: ProveedorDTO): void {
    this.proveedoresSrv.putData(proveedor).subscribe(() => {
      this.msgType = 'success';
      this.msg = 'Proveedor guardado';
      this.msgDescription = '';
      this.msgVisible = true;
      this.form.get('activo').setValue('1');
      this.form.get('fechaingreso').setValue(new Date());
      this.saved.emit();
    }, (error) => {
      console.log(error);
      this.msgType = 'error';
      this.msg = 'Error al guardar';
      if (typeof error.error === 'string') {
        this.msgDescription = error.error;
      } else {
        this.msgDescription = error.message;
      }
      this.msgVisible = true;
    });
  }

  hideMsg() {
    this.msgVisible = false;
  }

  editar(proveedor: ProveedorDTO) {
    this.form.get('id').setValue(proveedor.idproveedor);
    this.form.get('razonsocial').setValue(proveedor.razonsocial);
    this.form.get('activo').setValue(proveedor.activo.toString());
    this.form.get('nombrecontacto').setValue(proveedor.contacto);
    this.form.get('ci').setValue(proveedor.documento);
    this.form.get('dvruc').setValue(proveedor.dvRuc);
    this.form.get('telefonocontacto').setValue(proveedor.telefonoContacto);
    this.form.get('telefono').setValue(proveedor.telefono);
    this.form.get('email').setValue(proveedor.email);
    proveedor.fechaIngreso = this.form.get('fechaingreso').value;

    this.modoModificar = true;
  }

}
