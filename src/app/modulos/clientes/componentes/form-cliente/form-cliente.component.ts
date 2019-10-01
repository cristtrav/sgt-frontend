import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CiudadDTO } from './../../../../dto/CiudadDTO';
import { CiudadesService } from './../../../../services/ciudades.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteDTO } from 'src/app/dto/ClienteDTO';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent implements OnInit {

  modoEditar = false;
  labelSize = 6;
  controlSize = 17;
  ciudades: CiudadDTO[];
  form: FormGroup;
  msgVisible = false;
  tipoMsg = 'success';
  msg = 'Exito?';
  descripcionMsg = '';

  @Output()
  saved: EventEmitter<any> = new EventEmitter();

  @Input()
  set clienteEdit(cliente: ClienteDTO) {
    if (cliente == null) {
      this.nuevoCliente();
    } else {
      this.editarCliente(cliente);
    }
  }

  editarCliente(cliente: ClienteDTO) {
    this.modoEditar = true;
    this.msgVisible = false;
    if (this.form != null) {
      this.form.reset();
      this.form.get('ci').setValue(cliente.ci);
      this.form.get('nombres').setValue(cliente.nombres);
      this.form.get('apellidos').setValue(cliente.apellidos);

      const coddep = cliente.iddepartamento.toString().padStart(2, '0');
      const nrociu = cliente.idciudad.toString().padStart(2, '0');

      this.form.get('idciudad').setValue(`${coddep}${nrociu}`);
      this.form.get('dvruc').setValue(cliente.dvRuc);
      this.form.get('telefono').setValue(cliente.telefono);
      const fi = cliente.fechaIngreso;
      if (fi != null) {
        const fechaIng: Date = new Date(fi);
        this.form.get('fechaingreso').setValue(fechaIng);
      }
    }
  }

  nuevoCliente() {
    this.modoEditar = false;
    this.msgVisible = false;
    this.form.reset();
  }


  constructor(private ciudadesSrv: CiudadesService,
              private notification: NzNotificationService,
              private formBuilder: FormBuilder,
              private clientesSrv: ClientesService) { }

  ngOnInit() {
    this.cargarCiudades();
    this.form = this.formBuilder.group({
      ci: [null, [Validators.required]],
      nombres: [null, [Validators.required, Validators.maxLength(50)]],
      apellidos: [null, [Validators.required, Validators.maxLength(50)]],
      dvruc: [null, []],
      telefono: [null, []],
      idciudad: [null, [Validators.required]],
      fechaingreso: [null, []]
    });
  }

  cargarCiudades() {
    this.ciudadesSrv.getData(null, null).subscribe((data) => {
      this.ciudades = data;
    }, (error) => {
      console.log(error);
      if (typeof error.error === 'string') {
        this.notification.create('error', 'error al cargar ciudades', error.error);
      } else {
        this.notification.create('error', 'error al cargar ciudades', error.message);
      }
    });
  }

  guardar() {
    if (this.validar()) {
      const cliente: ClienteDTO = new ClienteDTO();
      cliente.ci = this.form.get('ci').value;
      cliente.nombres = this.form.get('nombres').value;
      cliente.apellidos = this.form.get('apellidos').value;
      cliente.dvRuc = this.form.get('dvruc').value;
      const tel = this.form.get('telefono').value;
      if (tel != null) {
        cliente.telefono = tel;
      }
      const codRefCiu: string = this.form.get('idciudad').value;
      const strCodDep: string = codRefCiu.substring(0, 2);
      const strNroCiu: string = codRefCiu.substring(2, 4);
      cliente.idciudad = parseInt(strNroCiu);
      cliente.iddepartamento = parseInt(strCodDep);
      const fi: Date = this.form.get('fechaingreso').value;
      if (fi != null) {
        //  let fechaFormateada = fi.getFullYear().toString();
        //  fechaFormateada += '-' + fi.getMonth().toString().padStart(2, '0');
        //  fechaFormateada += '-' + fi.getDay().toString().padStart(2, '0');

        cliente.fechaIngreso = fi;
      }
      if (this.modoEditar) {
        this.modificar(cliente);
      } else {
        this.crear(cliente);
      }

    }
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

  private crear(cliente: ClienteDTO): void {
    this.clientesSrv.postData(cliente).subscribe(() => {
      this.tipoMsg = 'success';
      this.msg = 'Cliente guardado';
      this.descripcionMsg = '';
      this.msgVisible = true;
      this.form.reset();
      this.saved.emit();
    }, (error) => {
      console.log(error);
      this.tipoMsg = 'error';
      this.msg = 'Error al guardar';
      if (typeof error.error === 'string') {
        this.descripcionMsg = error.error;
      } else {
        this.descripcionMsg = error.message;
      }
      this.msgVisible = true;
    });
  }

  private modificar(cliente: ClienteDTO): void {
    this.clientesSrv.putData(cliente).subscribe(() => {
      this.tipoMsg = 'success';
      this.msg = 'Cliente guardado';
      this.descripcionMsg = '';
      this.msgVisible = true;
      this.saved.emit();
    }, (error) => {
      console.log(error);
      this.tipoMsg = 'error';
      this.msg = 'Error al guardar';
      if (typeof error.error === 'string') {
        this.descripcionMsg = error.error;
      } else {
        this.descripcionMsg = error.message;
      }
      this.msgVisible = true;
    });
  }

  onMsgClose() {
    this.msgVisible = false;
  }

  getCodRefCiudad(ciudad: CiudadDTO): string {
    const coddep = ciudad.iddepartamento.toString().padStart(2, '0');
    const nrociu = ciudad.idciudad.toString().padStart(2, '0');
    return `${coddep}${nrociu}`;
  }

}
