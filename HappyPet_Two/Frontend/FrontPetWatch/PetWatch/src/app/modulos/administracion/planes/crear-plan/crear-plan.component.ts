import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloPlan } from 'src/app/modelos/plan.modelo';
import { PlanService } from 'src/app/servicios/plan.service';

@Component({
  selector: 'app-crear-plan',
  templateUrl: './crear-plan.component.html',
  styleUrls: ['./crear-plan.component.css']
})
export class CrearPlanComponent implements OnInit {
  fgValidador: FormGroup= this.fb.group({
    'nombrePlan': ['', [Validators.required]],
    'descripcion': ['', [Validators.required]],
    'precioPlan': ['', [Validators.required]],
    'proveedores': ['', [Validators.required]]
  
  });

  constructor(private fb: FormBuilder,
    private servicioPlan: PlanService,
    private router: Router) { }

  ngOnInit(): void {
  }

  GuardarPlan(){
    let nombrePlan = this.fgValidador.controls["nombrePlan"].value;
    let descripcion = (this.fgValidador.controls["descripcion"].value);
    let precioPlan = parseInt(this.fgValidador.controls["precioPlan"].value);
    let proveedores = (this.fgValidador.controls["proveedores"].value);
    

    let p= new ModeloPlan();
    p.nombrePlan= nombrePlan;
    p.descripcion= descripcion;
    p.precioPlan= precioPlan;
    p.proveedores= proveedores;

    this.servicioPlan.CrearPlan(p).subscribe((datos: ModeloPlan)=>{
      alert("Plan almacenado correctamente");
      this.router.navigate(["/administracion/listar-planes"]);
    },(error: any)=> {
      alert("Error almacenando el plan")
    })
  }

}
