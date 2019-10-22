import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/services/clientes.service';
import { ClienteDTO } from './../../../../dto/ClienteDTO';
import { NzNotificationService } from 'ng-zorro-antd';
import { MarcasService } from './../../../../services/marcas.service';
import { MarcaDTO } from './../../../../dto/MarcaDTO';
import { ModeloDTO } from './../../../../dto/ModeloDTO';
import { ModelosService } from './../../../../services/modelos.service';
import { VehiculosService } from './../../../../services/vehiculos.service';
import { VehiculoDTO } from 'src/app/dto/VehiculoDTO';

@Component({
  selector: 'app-form-vehiculo',
  templateUrl: './form-vehiculo.component.html',
  styleUrls: ['./form-vehiculo.component.css']
})
export class FormVehiculoComponent implements OnInit {

  modoModificar = false;
  form: FormGroup;
  clientes: ClienteDTO[];
  marcas: MarcaDTO[];
  modelos: ModeloDTO[];

  msgVisible = false;
  msg: string;
  msgType = 'success';
  msgDescription = '';

  @Output()
  saved: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder,
              private clientesSrv: ClientesService,
              private notification: NzNotificationService,
              private marcasSrv: MarcasService,
              private modeloSrv: ModelosService,
              private vehiculosSrv: VehiculosService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [null, [Validators.required]],
      cipropietario: [null, [Validators.required]],
      idmarca: [null, [Validators.required]],
      idmodelo: [null, [Validators.required]],
      fechaingreso: [null, [Validators.required]],
      color: ['', []],
      chapa: ['', []],
      observacion: ['', []]
    });
    this.cargarClientes();
    this.cargarMarcas();
    this.form.get('idmarca').valueChanges.subscribe((val) => {
      if (val == null) {
        this.modelos = [];
      } else {
        this.cargarModelos();
      }
    });
  }

  handleAlertClose() {
    this.msgVisible = false;
  }

  cargarModelos() {
    const idm = this.form.get('idmarca').value;
    this.modeloSrv.getData({ idmarca: idm }).subscribe((data) => {
      this.modelos = data;
    }, (err) => {
      if (typeof err.error === 'string') {
        this.notification.create('error', 'Error al cargar modelos', err.error);
      } else {
        this.notification.create('error', 'Error al cargar modelos', err.message);
      }
    });
  }

  cargarClientes() {
    this.clientesSrv.getData(30, 0).subscribe((data) => {
      this.clientes = data;
    }, (err) => {
      if (typeof err.error === 'string') {
        this.notification.create('error', 'Error al cargar clientes', err.error);
      } else {
        this.notification.create('error', 'Error al cargar clientes', err.message);
      }
    });
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

  guardar() {
    if (this.validar()) {
      if (this.modoModificar) {
        this.modificar();
      } else {
        this.crear();
      }
    } else {
      console.log('error de validacion');
    }
  }

  private modificar() {
    this.vehiculosSrv.putData(this.getDto()).subscribe(() => {
      this.msg = 'Guardado correctamente';
      this.msgDescription = '';
      this.msgType = 'success';
      this.msgVisible = true;
      this.saved.emit();
    }, (err) => {
      console.log(err);
      this.msg = 'Error al guardar.';
      if (typeof err.error === 'string') {
        this.msgDescription = err.error;
      } else {
        this.msgDescription = err.message;
      }
      this.msgType = 'error';
      this.msgVisible = true;
    });
  }

  private crear() {
    this.vehiculosSrv.postData(this.getDto()).subscribe(() => {
      this.msg = 'Guardado correctamente';
      this.msgDescription = '';
      this.msgType = 'success';
      this.msgVisible = true;
      this.saved.emit();
    }, (err) => {
      console.log(err);
      this.msg = 'Error al guardar.';
      if (typeof err.error === 'string') {
        this.msgDescription = err.error;
      } else {
        this.msgDescription = err.message;
      }
      this.msgType = 'error';
      this.msgVisible = true;
    });
  }

  private getDto(): VehiculoDTO {
    const vehiculo: VehiculoDTO = new VehiculoDTO();
    vehiculo.idvehiculo = this.form.get('id').value;
    vehiculo.cipropietario = this.form.get('cipropietario').value;
    vehiculo.idmodelo = this.form.get('idmodelo').value;
    vehiculo.color = this.form.get('color').value;
    vehiculo.chapa = this.form.get('chapa').value;
    vehiculo.observacion = this.form.get('observacion').value;
    vehiculo.fechaIngreso = this.form.get('fechaingreso').value;
    return vehiculo;
  }

  nuevoVehiculo() {
    this.modoModificar = false;
    this.form.reset();
  }

  editarVehiculo(vehiculo: VehiculoDTO) {
    this.modoModificar = true;
    this.form.get('id').setValue(vehiculo.idvehiculo);
    this.form.get('cipropietario').setValue(vehiculo.cipropietario);
    this.form.get('idmarca').setValue(vehiculo.idmarca);
    this.modelos = [];
    this.modeloSrv.getData({ idmarca: this.form.get('idmarca').value }).subscribe((data) => {
      this.modelos = data;
      this.form.get('idmodelo').setValue(vehiculo.idmodelo);
    }, (err) => {
      if (typeof err.error === 'string') {
        this.notification.create('error', 'Error al cargar modelo', err.error);
      } else {
        this.notification.create('error', 'Error al cargar modelo', err.message);
      }
    });
    this.form.get('fechaingreso').setValue(new Date(vehiculo.fechaIngreso));
    this.form.get('color').setValue(vehiculo.color);
    this.form.get('chapa').setValue(vehiculo.chapa);
    this.form.get('observacion').setValue(vehiculo.observacion);
  }

}
