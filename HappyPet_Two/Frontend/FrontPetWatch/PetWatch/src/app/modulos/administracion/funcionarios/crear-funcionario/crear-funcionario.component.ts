import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloFuncionario } from 'src/app/modelos/funcionario.modelo';
import { FuncionarioService } from 'src/app/servicios/funcionario.service';

@Component({
  selector: 'app-crear-funcionario',
  templateUrl: './crear-funcionario.component.html',
  styleUrls: ['./crear-funcionario.component.css']
})
export class CrearFuncionarioComponent implements OnInit {
  fgValidador: FormGroup= this.fb.group({
    'nombre': ['', [Validators.required]],
    'apellidos': ['', [Validators.required]],
    'telefono': ['', [Validators.required]],
    'direccion': ['', [Validators.required]],
    'correo': ['', [Validators.required]],
    'departamento': ['', [Validators.required]],
    'cargo': ['', [Validators.required]],
    'fechaInicio': ['', [Validators.required]],
    'credencial': ['', [Validators.required]]
  
  });

  constructor(private fb: FormBuilder,
    private servicioFuncionario: FuncionarioService,
    private router: Router) { }

  ngOnInit(): void {
  }

  GuardarFuncionario(){
    let nombre = this.fgValidador.controls["nombre"].value;
    let apellidos = (this.fgValidador.controls["apellidos"].value);
    let telefono = (this.fgValidador.controls["telefono"].value);
    let direccion = (this.fgValidador.controls["direccion"].value);
    let correo = (this.fgValidador.controls["correo"].value);
    let departamento = (this.fgValidador.controls["departamento"].value);
    let cargo = (this.fgValidador.controls["cargo"].value);
    let fechaInicio = (this.fgValidador.controls["fechaInicio"].value);
    let credencial = (this.fgValidador.controls["credencial"].value);



    let p= new ModeloFuncionario();
    p.nombre= nombre;
    p.apellidos= apellidos;
    p.telefono= telefono;
    p.direccion= direccion;
    p.correo= correo;
    p.departamento= departamento;
    p.cargo= cargo;
    p.fechaInicio= fechaInicio;
    p.credencial= credencial;


    this.servicioFuncionario.CrearFuncionario(p).subscribe((datos: ModeloFuncionario)=>{
      alert("Funcionario Registrado Correctamente");
      this.router.navigate(["/administracion/listar-funcionarios"]);
    },(error: any)=> {
      alert("Error registrando el Funcionario")
    })
  }
}
