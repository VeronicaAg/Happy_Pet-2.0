import { Component, OnInit } from '@angular/core';
import { ModeloPlan } from 'src/app/modelos/plan.modelo';
import { PlanService } from 'src/app/servicios/plan.service';

@Component({
  selector: 'app-buscar-plan',
  templateUrl: './buscar-plan.component.html',
  styleUrls: ['./buscar-plan.component.css']
})
export class BuscarPlanComponent implements OnInit {
  listadoRegistros: ModeloPlan []= [];

  constructor(private planServicio: PlanService) { }

  ngOnInit(): void {
    this.ObtenerListadoPlanes();
  }

  ObtenerListadoPlanes(){
    this.planServicio.ObtenerRegistros().subscribe((datos:ModeloPlan[])=>{
      this.listadoRegistros= datos;
    })
  }

}
