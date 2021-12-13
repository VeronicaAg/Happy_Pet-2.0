import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarFuncionarioComponent } from './funcionarios/buscar-funcionario/buscar-funcionario.component';
import { CrearFuncionarioComponent } from './funcionarios/crear-funcionario/crear-funcionario.component';
import { EditarFuncionarioComponent } from './funcionarios/editar-funcionario/editar-funcionario.component';
import { EliminarFuncionarioComponent } from './funcionarios/eliminar-funcionario/eliminar-funcionario.component';
import { BuscarPlanComponent } from './planes/buscar-plan/buscar-plan.component';
import { CrearPlanComponent } from './planes/crear-plan/crear-plan.component';
import { EditarPlanComponent } from './planes/editar-plan/editar-plan.component';
import { EliminarPlanComponent } from './planes/eliminar-plan/eliminar-plan.component';
import { BuscarProductoComponent } from './productos/buscar-producto/buscar-producto.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './productos/editar-producto/editar-producto.component';
import { EliminarProductoComponent } from './productos/eliminar-producto/eliminar-producto.component';

const routes: Routes = [
  {
    path: 'crear-funcionario',
    component: CrearFuncionarioComponent,
    // canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'editar-funcionario/:idFuncionario',
    component: EditarFuncionarioComponent,
    // canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'eliminar-funcionario/:idFuncionario',
    component: EliminarFuncionarioComponent,
    // canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'listar-funcionarios',
    component: BuscarFuncionarioComponent,
    // canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'listar-productos',
    component: BuscarProductoComponent,
    // canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'listar-planes',
    component: BuscarPlanComponent,
    // canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'crear-producto',
    component: CrearProductoComponent,
    // canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'editar-producto/:idProducto',
    component: EditarProductoComponent,
    // canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'eliminar-producto/:idProducto',
    component: EliminarProductoComponent,
    // canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'crear-plan',
    component: CrearPlanComponent,
    // canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'editar-plan/:idPlan',
    component: EditarPlanComponent,
    // canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'eliminar-plan/:idPlan',
    component: EliminarPlanComponent,
    // canActivate: [ValidadorSesionGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
