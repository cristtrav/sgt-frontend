import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartamentoDTO } from './../../../../dto/DepartamentoDTO';
import { DepartamentosService } from './../../../../services/departamentos.service';
import { RegionesService } from './../../../../services/regiones.service';
import { RegionDTO } from './../../../../dto/RegionDTO';

@Component({
  selector: 'app-form-departamento',
  templateUrl: './form-departamento.component.html',
  styleUrls: ['./form-departamento.component.css']
})
export class FormDepartamentoComponent implements OnInit {

  private modalVisible: boolean;

  modoEditar = false;
  tituloForm = 'Nuevo departamento';
  form: FormGroup;
  isMsgVisible = false;
  msgType = 'success';
  msg = '';
  msgDescription = '';
  regiones: RegionDTO[];

  @Input()
  set isFormVisible(visible: boolean) {
    this.modalVisible = visible;
  }

  get isFormVisible(): boolean {
    return this.modalVisible;
  }

  @Input()
  set departamentoEdit(departamento: DepartamentoDTO) {
    if (departamento == null) {
      this.tituloForm = 'Nuevo departamento';
      this.modoEditar = false;
      if (this.form != null) {
        this.form.reset();
      }
    } else {
      this.tituloForm = 'Editar departamento';
      this.modoEditar = true;
      this.form.get('iddepartamento').setValue(departamento.iddepartamento);
      this.form.get('nombre').setValue(departamento.nombre);
      this.form.get('idregion').setValue(departamento.idregion);
    }
    this.isMsgVisible = false;
  }

  @Output()
  isFormVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  saved = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private departamentoSrv: DepartamentosService,
              private regionesSrv: RegionesService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      iddepartamento: [null, [Validators.required]],
      nombre: [null, [Validators.required, Validators.maxLength(45)]],
      idregion: [null, [Validators.required]]
    });
    this.cargarRegiones();
  }

  cerrarForm(): void {
    this.isFormVisible = false;
    this.isFormVisibleChange.emit();
  }

  handleCloseMsg() {
    this.isMsgVisible = false;
  }

  guardar(): void {
    let validado = true;
    Object.keys(this.form.controls).forEach((key) => {
      const ctrl = this.form.get(key);
      validado = validado && ctrl.valid;
      ctrl.markAsDirty();
      ctrl.updateValueAndValidity();
    });
    if (validado) {
      console.log('Validado, se guarda');

      const iddepartamento = this.form.get('iddepartamento').value;
      const nombre = this.form.get('nombre').value;
      const idregion = this.form.get('idregion').value;

      const departamento: DepartamentoDTO = new DepartamentoDTO();
      departamento.iddepartamento = iddepartamento;
      departamento.nombre = nombre;
      departamento.idregion = idregion;
      if (this.modoEditar) {
        this.modificar(departamento);
      } else {
        this.crear(departamento);
      }
    } else {
      console.log('Invalido, no se guarda');
    }
  }

  private crear(departamento: DepartamentoDTO) {
    this.departamentoSrv.postData(departamento).subscribe(() => {
      this.msg = 'Guardado correctamente';
      this.msgDescription = '';
      this.msgType = 'success';
      this.form.reset();
      this.saved.emit();
    }, (error) => {
      this.msg = 'Error al guardar';
      this.msgType = 'error';
      if (typeof error.error === 'string') {
        this.msgDescription = error.error;
      } else {
        this.msgDescription = error.message;
      }
    });
    this.isMsgVisible = true;
  }

  private modificar(departamento: DepartamentoDTO) {
    this.departamentoSrv.putData(departamento).subscribe(() => {
      this.msg = 'Guardado correctamente';
      this.msgDescription = '';
      this.msgType = 'success';

      this.saved.emit();
    }, (error) => {
      this.msg = 'Error al guardar';
      this.msgType = 'error';
      if (typeof error.error === 'string') {
        this.msgDescription = error.error;
      } else {
        this.msgDescription = error.message;
      }
    });
    this.isMsgVisible = true;
  }

  cargarRegiones(): void {
    this.regionesSrv.getData().subscribe((data) => {
      this.regiones = data;
    }, (error) => {
      console.log('error al cargar regiones');
      console.log(error);
    });
  }

}
