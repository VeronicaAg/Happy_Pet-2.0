import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloPlan } from 'src/app/modelos/plan.modelo';
import { PlanService } from 'src/app/servicios/plan.service';

@Component({
  selector: 'app-eliminar-plan',
  templateUrl: './eliminar-plan.component.html',
  styleUrls: ['./eliminar-plan.component.css']
})
export class EliminarPlanComponent implements OnInit {
  idPlan:string = '';

  fgValidador: FormGroup= this.fb.group({
    'idPlan':['', [Validators.required]],
    'nombrePlan': ['', [Validators.required]],
    'descripcion': ['', [Validators.required]],
    'precioPlan': ['', [Validators.required]],
    'proveedores': ['', [Validators.required]]
  
  });

  constructor(private fb: FormBuilder,
    private servicioPlan: PlanService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idPlan= this.route.snapshot.params["idPlan"];
    this.BuscarPlan();
  }

  BuscarPlan(){
    this.servicioPlan.ObtenerRegistroPorId(this.idPlan).subscribe((datos: ModeloPlan)=>{
      this.fgValidador.controls["idPlan"].setValue(this.idPlan);
      this.fgValidador.controls["nombrePlan"].setValue(datos.nombrePlan);
      this.fgValidador.controls["descripcion"].setValue(datos.descripcion);
      this.fgValidador.controls["precioPlan"].setValue(datos.precioPlan);
      this.fgValidador.controls["proveedores"].setValue(datos.proveedores);
     
    });
  }

  DeletePlan(){


    this.servicioPlan.EliminarPlan(this.idPlan).subscribe((datos: ModeloPlan)=>{
      alert("Plan Eliminado");
      this.router.navigate(["/administracion/listar-planes"]);
    },(error: any)=> {
      alert("Error en la eliminacion")
    })
  }

}
