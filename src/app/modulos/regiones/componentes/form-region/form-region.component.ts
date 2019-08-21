import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { RegionDTO } from './../../../../dto/RegionDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegionesService } from '../../../../services/regiones.service';

@Component({
  selector: 'app-form-region',
  templateUrl: './form-region.component.html',
  styleUrls: ['./form-region.component.css']
})
export class FormRegionComponent implements OnInit {
  @Input()
  set formVisible(v: boolean) {
    if (v) {
      if (!this.modoEditar ) {
        this.msgVisible = false;
      }
    }
    this.frmVis = v;
  }

  get formVisible(): boolean {
    return this.frmVis;
  }

  @Input()
  set regionEdit(region: RegionDTO) {
    if (region != null) {
      this.modoEditar = true;
      console.log('Region edit input> id: ' + region.idregion + ', nombre: ' + region.nombre);
      this.tituloForm = 'Editar Región';
      this.form.get('idregion').setValue(region.idregion);
      this.form.get('nombre').setValue(region.nombre);
    } else {
      this.modoEditar = false;
      this.tituloForm = 'Nueva Región';
      if  (this.form != null) {
        this.form.reset();
      }
      console.log('region editar null');
    }
    this.msgVisible = false;
  }

  @Output()
  formVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  saved = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private regionesService: RegionesService) { }

  tituloForm = 'Nueva Región';
  private frmVis: boolean;
  msgVisible = false;
  tipoMsg = 'success';
  msg = '';
  msgDetail = '';
  form: FormGroup;
  modoEditar = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idregion: [null, [Validators.required, Validators.min(1), Validators.max(9)]],
      nombre: [null, [Validators.required, Validators.maxLength(45)]]
    });
  }

  mostrarForm(): void {
    this.formVisible = true;
    this.formVisibleChange.emit(this.formVisible);
  }

  cerrarForm(): void {
    this.formVisible = false;
    this.formVisibleChange.emit(this.formVisible);
  }

  guardarRegion(): void {
    let validado = true;
    Object.keys(this.form.controls).forEach((key) => {
      const ctrl = this.form.get(key);
      console.log('validation errors : ' + key);
      console.log(ctrl.errors);
      ctrl.markAsDirty();
      ctrl.updateValueAndValidity();
      validado = validado && ctrl.valid;
    });
    if (validado) {
      this.msgVisible = true;
      const rg: RegionDTO = new RegionDTO();
      const id = this.form.get('idregion').value;
      const nomb = this.form.get('nombre').value;
      rg.idregion = id;
      rg.nombre = nomb;
      if (this.modoEditar) {
        this.editar(rg);
      } else {
        this.crear(rg);
      }
    } else {
      this.msgVisible = false;
    }
  }

  private crear(region: RegionDTO) {
    this.regionesService.postData(region).subscribe(() => {
      this.tipoMsg = 'success';
      this.msg = 'Guardado correctamente';
      this.msgDetail = '';
      this.saved.emit();
      this.form.reset();
    }, error => {
      this.tipoMsg = 'error';
      this.msg = 'Error al guardar';
      if (typeof error.error === 'string') {
        this.msgDetail = error.error;
      } else {
        this.msgDetail = error.message;
      }
      console.log(error);
    });
  }

  private editar(region: RegionDTO) {
    this.regionesService.putData(region).subscribe(() => {
      this.tipoMsg = 'success';
      this.msg = 'Guardado correctamente';
      this.msgDetail = '';
      this.saved.emit();
    }, error => {
      this.tipoMsg = 'error';
      this.msg = 'Error al guardar';
      if (typeof error.error === 'string') {
        this.msgDetail = error.error;
      } else {
        this.msgDetail = error.message;
      }
      console.log(error);
    });
  }

  postCerraMsg(): void {
    this.msgVisible = false;
  }


}
