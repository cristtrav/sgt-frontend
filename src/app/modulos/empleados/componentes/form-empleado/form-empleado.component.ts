import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { CargosService } from './../../../../services/cargos.service';
import { CargoDTO } from './../../../../dto/CargoDTO';
import { NzNotificationService } from 'ng-zorro-antd';
import { FuncionarioDTO } from './../../../../dto/FuncionarioDTO';
import * as argon2 from 'argon2';

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

  constructor(private formBuilder: FormBuilder, private cargosSrv: CargosService, private notification: NzNotificationService) { }

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
      console.log('form null');
    }
    return {};
  }

  pwdValidator = (control: FormControl): { [s: string]: boolean } => {
    if (this.form) {
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

  guardar() {
    if (this.validar()) {
      console.log('validado, se guarda');
      this.toDto();
    }
  }

  nuevo() {
    this.form.reset();
    this.form.get('activo').setValue(true);
  }

  toDto(): FuncionarioDTO {
    const funcionario: FuncionarioDTO = new FuncionarioDTO();
    funcionario.idcargo = this.form.get('id').value;
    funcionario.nombres = this.form.get('nombres').value;
    funcionario.apellidos = this.form.get('apellidos').value;
    funcionario.ci = this.form.get('ci').value;
    funcionario.idcargo = this.form.get('idcargo').value;
    funcionario.telefono = this.form.get('telefono').value;
    funcionario.activo = this.form.get('activo').value ? 1 : 0;
    funcionario.accesoSistema = this.form.get('accesosistema').value ? 1 : 0;
    const pwdHash = argon2.hash(this.form.get('pwd').value);
    console.log('La contrasenia hash es: ' + pwdHash);
    return funcionario;
  }

}
