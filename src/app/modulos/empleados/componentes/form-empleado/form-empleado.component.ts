import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { CargosService } from './../../../../services/cargos.service';
import { CargoDTO } from './../../../../dto/CargoDTO';
import { NzNotificationService } from 'ng-zorro-antd';
import { FuncionarioDTO } from './../../../../dto/FuncionarioDTO';
import { FuncionariosService } from './../../../../services/funcionarios.service';

@Component({
  selector: 'app-form-empleado',
  templateUrl: './form-empleado.component.html',
  styleUrls: ['./form-empleado.component.css']
})
export class FormEmpleadoComponent implements OnInit {

  modoModificar = false;

  form: FormGroup;

  pwdValidateStatus = 'success';
  msgValidacionPwd = 'Las contraseñas no coinciden';
  pwdRequired = false;
  cargos: CargoDTO[];

  msg: string;
  msgDescription: string;
  msgType = 'success';
  msgVisible = false;

  processing = false;

  placeholderPwd = 'Contraseña';

  @Output()
  saved: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder,
              private cargosSrv: CargosService,
              private notification: NzNotificationService,
              private funcionariosSrv: FuncionariosService) { }

  handleAlertClose() {
    this.msgVisible = false;
  }

  cargarCargos(): void {
    this.cargosSrv.getData().subscribe((data) => {
      this.cargos = data;
    }, (err) => {
      if (typeof err.error === 'string') {
        this.notification.create('error', 'Error al cargar cargos', err.error);
      } else {
        this.notification.create('error', 'Error al cargar cargos', err.message);
      }
    });
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (this.form) {
      if (!this.modoModificar) {
        if (this.form.get('accesosistema').value === true) {
          if (!this.form.controls.pwd.value && !control.value) {
            this.pwdValidateStatus = 'error';
            this.msgValidacionPwd = 'Ingrese una contraseña.';
            return { error: true };
          } else {
            if (control.value !== this.form.controls.pwd.value) {
              this.pwdValidateStatus = 'error';
              this.msgValidacionPwd = 'Las contraseñas no coinciden.';
              return { error: true };
            } else {
              this.pwdValidateStatus = 'success';
              this.msgValidacionPwd = '';
            }
          }
        } else {
          if (this.form.controls.pwd.value || control.value) {
            if (control.value !== this.form.controls.pwd.value) {
              this.pwdValidateStatus = 'error';
              this.msgValidacionPwd = 'Las contraseñas no coinciden.';
              return { error: true };
            } else {
              this.pwdValidateStatus = 'success';
            }
          } else {
            this.pwdValidateStatus = 'success';
          }
        }
      } else {
        if (this.form.controls.pwd.value || control.value) {
          if (control.value !== this.form.controls.pwd.value) {
            this.pwdValidateStatus = 'error';
            this.msgValidacionPwd = 'Las contraseñas no coinciden.';
            return { error: true };
          } else {
            this.pwdValidateStatus = 'success';
          }
        } else {
          this.pwdValidateStatus = 'success';
        }
      }
    } else {
      console.log('form null');
    }
    return {};
  }

  pwdValidator = (control: FormControl): { [s: string]: boolean } => {
    if (this.form) {
      if (!this.modoModificar) {
        if (this.form.get('accesosistema').value === true) {
          if (!this.form.controls.pwdConf.value && !control.value) {
            this.pwdValidateStatus = 'error';
            this.msgValidacionPwd = 'Ingrese una contraseña.';
            return { error: true };
          } else {
            if (control.value !== this.form.controls.pwdConf.value) {
              this.pwdValidateStatus = 'error';
              this.msgValidacionPwd = 'Las contraseñas no coinciden.';
              return { error: true };
            } else {
              this.pwdValidateStatus = 'success';
              this.msgValidacionPwd = '';
            }
          }
        } else {
          if (this.form.controls.pwdConf.value || control.value) {
            if (control.value !== this.form.controls.pwdConf.value) {
              this.pwdValidateStatus = 'error';
              return { error: true };
            } else {
              this.pwdValidateStatus = 'success';
            }
          } else {
            this.pwdValidateStatus = 'success';
          }
        }
      } else {
        if (control.value !== this.form.controls.pwdConf.value) {
          this.pwdValidateStatus = 'error';
          this.msgValidacionPwd = 'Las contraseñas no coinciden.';
          return { error: true };
        } else {
          this.pwdValidateStatus = 'success';
          this.msgValidacionPwd = '';
        }
      }
    } else {
      console.log('form null');
    }
    return {};
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [null, [Validators.required]],
      nombres: [null, [Validators.required, Validators.maxLength(45)]],
      apellidos: [null, [Validators.required, Validators.maxLength(45)]],
      ci: [null, [Validators.required]],
      idcargo: [null, [Validators.required]],
      pwd: [null, [this.pwdValidator]],
      pwdConf: [null, [this.confirmValidator]],
      telefono: [null, []],
      activo: [],
      accesosistema: []
    });
    this.form.get('accesosistema').valueChanges.subscribe((val) => {
      this.pwdRequired = val;
    });
    this.form.get('activo').setValue(true);

    this.cargarCargos();
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

  private modificarFuncionario() {
    this.processing = true;
    this.funcionariosSrv.putData(this.toDto()).subscribe(() => {
      this.msgVisible = true;
      this.msg = 'Guardado correctamente';
      this.msgDescription = '';
      this.msgType = 'success';
      this.processing = false;
      this.saved.emit();
    }, (err) => {
      this.msgVisible = true;
      this.msg = 'Error al guardar';
      this.msgDescription = typeof err.error === 'string' ? err.error : err.message;
      this.msgType = 'error';
      this.processing = false;
      console.log(err);
    });
  }

  private guardarFuncionario() {
    this.processing = true;
    console.log('validado, se guarda');
    this.funcionariosSrv.postData(this.toDto()).subscribe(() => {
      this.msgVisible = true;
      this.msg = 'Guardado correctamente';
      this.msgDescription = '';
      this.msgType = 'success';
      this.processing = false;
      this.saved.emit();
    }, (err) => {
      this.msgVisible = true;
      this.msg = 'Error al guardar';
      this.msgDescription = typeof err.error === 'string' ? err.error : err.message;
      this.msgType = 'error';
      this.processing = false;
      console.log(err);
    });
  }

  guardar() {
    if (this.validar()) {
      if (this.modoModificar) {
        this.modificarFuncionario();
      } else {
        this.guardarFuncionario();
      }
    }
  }

  nuevo() {
    this.form.reset();
    this.form.get('activo').setValue(true);
    this.placeholderPwd = 'Contraseña';
    this.modoModificar = false;
    this.msgVisible = false;
  }

  toDto(): FuncionarioDTO {

    const funcionario: FuncionarioDTO = new FuncionarioDTO();
    funcionario.idfuncionario = this.form.get('id').value;
    funcionario.nombres = this.form.get('nombres').value;
    funcionario.apellidos = this.form.get('apellidos').value;
    funcionario.ci = this.form.get('ci').value;
    funcionario.idcargo = this.form.get('idcargo').value;
    funcionario.telefono = this.form.get('telefono').value;
    funcionario.activo = this.form.get('activo').value ? 1 : 0;
    funcionario.accesoSistema = this.form.get('accesosistema').value ? 1 : 0;
    funcionario.password = this.form.get('pwd').value;

    return funcionario;
  }

  cargarDatos(funcionario: FuncionarioDTO) {
    this.form.reset();
    // Object.keys(this.form.controls).forEach((key) => {
    // this.form.get(key).markAsPristine();
    // });
    this.form.get('id').setValue(funcionario.idfuncionario);
    this.form.get('nombres').setValue(funcionario.nombres);
    this.form.get('apellidos').setValue(funcionario.apellidos);
    this.form.get('ci').setValue(funcionario.ci);
    this.form.get('idcargo').setValue(funcionario.idcargo);
    this.form.get('telefono').setValue(funcionario.telefono);
    this.form.get('activo').setValue(funcionario.activo === 1 ? true : false);
    this.form.get('accesosistema').setValue(funcionario.accesoSistema === 1 ? true : false);
    this.modoModificar = true;
    this.placeholderPwd = ('Contraseña(Sin cambios)');
    this.msgVisible = false;
  }

}
