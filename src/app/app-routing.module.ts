import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'regiones', loadChildren: () => import('./modulos/regiones/regiones.module').then(m => m.RegionesModule) },
  { path: 'departamentos', loadChildren: () => import('./modulos/departamentos/departamentos.module').then(m => m.DepartamentosModule) },
  { path: 'ciudades', loadChildren: () => import('./modulos/ciudades/ciudades.module').then(m => m.CiudadesModule) },
  { path: 'clientes', loadChildren: () => import('./modulos/clientes/clientes.module').then(m => m.ClientesModule) },
  { path: 'proveedores', loadChildren: () => import('./modulos/proveedores/proveedores.module').then(m => m.ProveedoresModule) },
  { path: 'marcas', loadChildren: () => import('./modulos/marcas/marcas.module').then(m => m.MarcasModule) },
  { path: 'modelos', loadChildren: () => import('./modulos/modelos/modelos.module').then(m => m.ModelosModule) },
  { path: 'empleados', loadChildren: () => import('./modulos/empleados/empleados.module').then(m => m.EmpleadosModule) },
  { path: 'cargos', loadChildren: () => import('./modulos/cargos/cargos.module').then(m => m.CargosModule) },
  { path: 'vehiculos', loadChildren: () => import('./modulos/vehiculos/vehiculos.module').then(m => m.VehiculosModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
