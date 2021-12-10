import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { CrearFuncionarioComponent } from './funcionarios/crear-funcionario/crear-funcionario.component';
import { EditarFuncionarioComponent } from './funcionarios/editar-funcionario/editar-funcionario.component';
import { BuscarFuncionarioComponent } from './funcionarios/buscar-funcionario/buscar-funcionario.component';
import { EliminarFuncionarioComponent } from './funcionarios/eliminar-funcionario/eliminar-funcionario.component';
import { EliminarProductoComponent } from './productos/eliminar-producto/eliminar-producto.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { BuscarProductoComponent } from './productos/buscar-producto/buscar-producto.component';
import { EditarProductoComponent } from './productos/editar-producto/editar-producto.component';
import { CrearPlanComponent } from './planes/crear-plan/crear-plan.component';
import { EliminarPlanComponent } from './planes/eliminar-plan/eliminar-plan.component';
import { BuscarPlanComponent } from './planes/buscar-plan/buscar-plan.component';
import { EditarPlanComponent } from './planes/editar-plan/editar-plan.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CrearFuncionarioComponent,
    EditarFuncionarioComponent,
    BuscarFuncionarioComponent,
    EliminarFuncionarioComponent,
    EliminarProductoComponent,
    CrearProductoComponent,
    BuscarProductoComponent,
    EditarProductoComponent,
    CrearPlanComponent,
    EliminarPlanComponent,
    BuscarPlanComponent,
    EditarPlanComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdministracionModule { }
