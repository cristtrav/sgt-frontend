import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MarcaDTO } from './../../../../dto/MarcaDTO';
import { MarcasService } from './../../../../services/marcas.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModeloDTO } from './../../../../dto/ModeloDTO';
import { ModelosService } from './../../../../services/modelos.service';

@Component({
  selector: 'app-form-modelo',
  templateUrl: './form-modelo.component.html',
  styleUrls: ['./form-modelo.component.css']
})
export class FormModeloComponent implements OnInit {

  marcas: MarcaDTO[];

  form: FormGroup;

  modoModificar = false;

  msgType = 'success';
  msg = '';
  msgDescription = '';
  msgVisible = false;

  @Output()
  saved: EventEmitter<any> = new EventEmitter();

  constructor(private marcasSrv: MarcasService,
              private notification: NzNotificationService,
              private formBuilder: FormBuilder,
              private modelosSrv: ModelosService) { }

  ngOnInit() {
    this.cargarMarcas();
    this.form = this.formBuilder.group({
      id: [null, [Validators.required]],
      nombre: [null, [Validators.required, Validators.maxLength(20)]],
      idmarca: [null, [Validators.required]],
      anio: [null, []]
    });
  }

  get maxAnio(): number {
    const anio: number = new Date().getFullYear() + 2;
    return anio;
  }

  cargarMarcas() {
    this.marcasSrv.getData().subscribe((data) => {
      this.marcas = data;
    }, (err) => {
      if (typeof err.error === 'string') {
        this.notification.create('error', 'Error al cargar marcas', err.error);
      } else {
        this.notification.create('error', 'Error al cargar marcas', err.message);
      }
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

  private crear(modelo: ModeloDTO): void {
    this.modelosSrv.postData(modelo).subscribe(() => {
      this.msgType = 'success';
      this.msg = 'Modelo guardado';
      this.msgDescription = '';
      this.msgVisible = true;
      this.form.reset();
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

  private modificar(modelo: ModeloDTO): void {
    this.modelosSrv.putData(modelo).subscribe(() => {
      this.msgType = 'success';
      this.msg = 'Modelo guardado';
      this.msgDescription = '';
      this.msgVisible = true;
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

  private getDto(): ModeloDTO {
    const modelo: ModeloDTO = new ModeloDTO();
    modelo.idmodelo = this.form.get('id').value;
    modelo.nombre = this.form.get('nombre').value;
    modelo.idmarca = this.form.get('idmarca').value;
    modelo.anio = this.form.get('anio').value;
    return modelo;
  }

  guardar() {
    if (this.validar()) {
      if (this.modoModificar) {
        this.modificar(this.getDto());
      } else {
        this.crear(this.getDto());
      }
    } else {
      this.msgVisible = false;
    }
  }

  handleCloseMsg() {
    this.msgVisible = false;
  }

  nuevo() {
    this.modoModificar = false;
    this.form.reset();
    this.msgVisible = false;
  }

  editar(modelo: ModeloDTO) {
    this.modoModificar = true;
    this.msgVisible = false;
    this.form.get('id').setValue(modelo.idmodelo);
    this.form.get('nombre').setValue(modelo.nombre);
    this.form.get('idmarca').setValue(modelo.idmarca);
    this.form.get('anio').setValue(modelo.anio);
  }
}
