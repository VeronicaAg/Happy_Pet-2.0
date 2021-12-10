import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarClienteComponent } from './nuevoCliente/buscar-cliente/buscar-cliente.component';
import { CrearClienteComponent } from './nuevoCliente/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './nuevoCliente/editar-cliente/editar-cliente.component';
import { EliminarClienteComponent } from './nuevoCliente/eliminar-cliente/eliminar-cliente.component';

const routes: Routes = [
  {
    path: 'registrar',
    component: CrearClienteComponent,
    // canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'listar-clientes',
    component: BuscarClienteComponent,
    // canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'editar-cliente/:idCliente',
    component: EditarClienteComponent,
    // canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'eliminar-cliente/:idCliente',
    component: EliminarClienteComponent,
    // canActivate: [ValidadorSesionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
