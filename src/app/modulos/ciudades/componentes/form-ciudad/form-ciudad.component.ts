import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DepartamentoDTO } from './../../../../dto/DepartamentoDTO';
import { DepartamentosService } from './../../../../services/departamentos.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CiudadDTO } from 'src/app/dto/CiudadDTO';
import { CiudadesService } from './../../../../services/ciudades.service';

@Component({
  selector: 'app-form-ciudad',
  templateUrl: './form-ciudad.component.html',
  styleUrls: ['./form-ciudad.component.css']
})
export class FormCiudadComponent implements OnInit {

  tituloForm = 'Nueva Ciudad';
  departamentos: DepartamentoDTO[];
  form: FormGroup;

  tipoMsg = 'success';
  msg = 'Eeexito';
  msgDescripcion = 'llaalala';
  msgVisible = false;
  modoEditar = false;

  @Input()
  set ciudadEdit(ciudad: CiudadDTO) {
    if (ciudad == null) {
      this.tituloForm = 'Nueva Ciudad';
      if (this.form != null) {
        this.form.reset();
      }
      this.modoEditar = false;
      this.msgVisible = false;
    } else {
      this.tituloForm = 'Editar Ciudad';
      if (this.form != null) {
        this.form.reset();
      }
      this.form.get('idciudad').setValue(ciudad.idciudad);
      this.form.get('nombre').setValue(ciudad.nombre);
      this.form.get('iddepartamento').setValue(ciudad.iddepartamento);
      this.modoEditar = true;
      this.msgVisible = false;
    }
  }

  @Input()
  formVisible = false;

  @Output()
  formVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  saved = new EventEmitter();

  constructor(private departamentosSrv: DepartamentosService,
              private ciudadesSrv: CiudadesService,
              private notification: NzNotificationService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      idciudad: [null, [Validators.required]],
      nombre: [null, [Validators.required, Validators.maxLength(45)]],
      iddepartamento: [null, [Validators.required]]
    });
    this.cargarDepartamentos();
  }

  cerrarForm() {
    this.formVisible = false;
    this.formVisibleChange.emit();
  }

  guardar() {
    if (this.validar()) {
      const ciudad: CiudadDTO = new CiudadDTO();
      ciudad.idciudad = this.form.get('idciudad').value;
      ciudad.nombre = this.form.get('nombre').value;
      ciudad.iddepartamento = this.form.get('iddepartamento').value;
      if (this.modoEditar) {
        this.editar(ciudad);
      } else {
        this.crear(ciudad);
      }
    }
  }

  private crear(ciudad: CiudadDTO) {
    this.ciudadesSrv.postData(ciudad).subscribe(() => {
      this.tipoMsg = 'success';
      this.msg = 'Ciudad guardada';
      this.msgDescripcion = '';
      this.msgVisible = true;
      this.saved.emit();
      this.form.reset();
    }, (error) => {
      console.log(error);
      this.tipoMsg = 'error';
      this.msg = 'Error al guardar';
      if (typeof error.error === 'string') {
        this.msgDescripcion = error.error;
      } else {
        this.msgDescripcion = error.message;
      }
      this.msgVisible = true;
    });
  }

  private editar(ciudad: CiudadDTO) {
    this.ciudadesSrv.putData(ciudad).subscribe(() => {
      this.tipoMsg = 'success';
      this.msg = 'Ciudad guardada';
      this.msgDescripcion = '';
      this.msgVisible = true;
      this.saved.emit();
    }, (error) => {
      console.log(error);
      this.tipoMsg = 'error';
      this.msg = 'Error al guardar';
      if (typeof error.error === 'string') {
        this.msgDescripcion = error.error;
      } else {
        this.msgDescripcion = error.message;
      }
      this.msgVisible = true;
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

  cargarDepartamentos(): void {
    this.departamentosSrv.getData().subscribe((data) => {
      this.departamentos = data;
    }, (error) => {
      console.log(error);
      if (typeof error.error === 'string') {
        this.notification.create('error', 'Error al cargar ciudades', error.error);
      } else {
        this.notification.create('error', 'Error al cargar ciudades', error.message);
      }
    });
  }

  onCloseMsg() {
    this.msgVisible = false;
  }

}
