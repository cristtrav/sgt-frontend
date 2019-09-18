import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MarcaDTO } from './../../../../dto/MarcaDTO';
import { MarcasService } from './../../../../services/marcas.service';

@Component({
  selector: 'app-form-marca',
  templateUrl: './form-marca.component.html',
  styleUrls: ['./form-marca.component.css']
})
export class FormMarcaComponent implements OnInit {

  form: FormGroup;

  modoModificar = false;

  msgType = 'success';
  msgVisible = false;
  msg = '';
  msgDescription = '';

  @Output()
  saved: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private marcasSrv: MarcasService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [null, [Validators.required]],
      nombre: [null, [Validators.required, Validators.maxLength(30)]]
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

  getDto(): MarcaDTO {
    const marca: MarcaDTO = new MarcaDTO();
    marca.idmarca = this.form.get('id').value;
    marca.nombre = this.form.get('nombre').value;
    return marca;
  }

  guardar() {
    if (this.validar()) {
      if (this.modoModificar) {
        this.editar(this.getDto());
      } else {
        this.crear(this.getDto());
      }
    } else {
      this.msgVisible = false;
      console.log('no se guarda');
    }
  }

  private crear(marca: MarcaDTO): void {
    this.marcasSrv.postData(marca).subscribe(() => {
      this.msgType = 'success';
      this.msg = 'Marca guardada';
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

  private editar(marca: MarcaDTO): void {
    this.marcasSrv.putData(marca).subscribe(() => {
      this.msgType = 'success';
      this.msg = 'Marca guardada';
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

  editarMarca(marca: MarcaDTO) {
    this.form.get('id').setValue(marca.idmarca);
    this.form.get('nombre').setValue(marca.nombre);
    this.modoModificar = true;
    this.msgVisible = false;
  }

  handleHideMsg() {
    this.msgVisible = false;
  }

  nuevo() {
    this.form.reset();
    this.msgVisible = false;
    this.modoModificar = false;
  }
}
