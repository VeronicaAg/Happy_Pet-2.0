import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { BuscarMascotaComponent } from './mascotas/buscar-mascota/buscar-mascota.component';
import { CrearMascotaComponent } from './mascotas/crear-mascota/crear-mascota.component';
import { EditarMascotaComponent } from './mascotas/editar-mascota/editar-mascota.component';
import { EliminarMascotaComponent } from './mascotas/eliminar-mascota/eliminar-mascota.component';
import { EliminarClienteComponent } from './nuevoCliente/eliminar-cliente/eliminar-cliente.component';
import { EditarClienteComponent } from './nuevoCliente/editar-cliente/editar-cliente.component';
import { BuscarClienteComponent } from './nuevoCliente/buscar-cliente/buscar-cliente.component';
import { CrearClienteComponent } from './nuevoCliente/crear-cliente/crear-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BuscarMascotaComponent,
    CrearMascotaComponent,
    EditarMascotaComponent,
    EliminarMascotaComponent,
    EliminarClienteComponent,
    EditarClienteComponent,
    BuscarClienteComponent,
    CrearClienteComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClienteModule { }
