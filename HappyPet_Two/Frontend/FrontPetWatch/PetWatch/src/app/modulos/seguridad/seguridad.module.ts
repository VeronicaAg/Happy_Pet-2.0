import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { IdentificacionComponent } from './identificacion/identificacion.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { CambioClaveComponent } from './cambio-clave/cambio-clave.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';


@NgModule({
  declarations: [
    IdentificacionComponent,
    RecuperarClaveComponent,
    CerrarSesionComponent,
    CambioClaveComponent,
    IniciarSesionComponent
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class SeguridadModule { }
