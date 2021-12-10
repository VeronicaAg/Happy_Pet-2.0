import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloPlan } from 'src/app/modelos/plan.modelo';
import { PlanService } from 'src/app/servicios/plan.service';

@Component({
  selector: 'app-editar-plan',
  templateUrl: './editar-plan.component.html',
  styleUrls: ['./editar-plan.component.css']
})
export class EditarPlanComponent implements OnInit {
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

  EditarPlan(){
    let nombrePlan = this.fgValidador.controls["nombrePlan"].value;
    let descripcion = this.fgValidador.controls["descripcion"].value;
    let precioPlan = parseInt(this.fgValidador.controls["precioPlan"].value);
    let proveedores = this.fgValidador.controls["proveedores"].value;
    

    let p= new ModeloPlan();
    p.nombrePlan= nombrePlan;
    p.descripcion= descripcion;
    p.precioPlan= precioPlan;
    p.proveedores= proveedores;
    p.idPlan= this.idPlan;

    this.servicioPlan.ActualizarPlan(p).subscribe((datos: ModeloPlan)=>{
      alert("Plan actualizado correctamente");
      this.router.navigate(["/administracion/listar-planes"]);
    },(error: any)=> {
      alert("Error actualizando el plan")
    })
  }

}
