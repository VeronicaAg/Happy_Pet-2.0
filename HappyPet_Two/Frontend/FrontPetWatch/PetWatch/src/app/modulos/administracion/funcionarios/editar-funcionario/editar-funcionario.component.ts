import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloFuncionario } from 'src/app/modelos/funcionario.modelo';
import { FuncionarioService } from 'src/app/servicios/funcionario.service';

@Component({
  selector: 'app-editar-funcionario',
  templateUrl: './editar-funcionario.component.html',
  styleUrls: ['./editar-funcionario.component.css']
})
export class EditarFuncionarioComponent implements OnInit {

  idFuncionario:string = '';
  fgValidador: FormGroup= this.fb.group({
    'idFuncionario': ['', [Validators.required]],
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
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idFuncionario = this.route.snapshot.params["idFuncionario"];
    this.BuscarFuncionario();
  }

  BuscarFuncionario() {
    this.servicioFuncionario.ObtenerRegistroPorId(this.idFuncionario).subscribe((datos: ModeloFuncionario) => {
      this.fgValidador.controls["idFuncionario"].setValue(this.idFuncionario);
      this.fgValidador.controls["nombre"].setValue(datos.nombre);
      this.fgValidador.controls["apellidos"].setValue(datos.apellidos);
      this.fgValidador.controls["telefono"].setValue(datos.telefono);
      this.fgValidador.controls["direccion"].setValue(datos.direccion);
      this.fgValidador.controls["correo"].setValue(datos.correo);
      this.fgValidador.controls["departamento"].setValue(datos.departamento);
      this.fgValidador.controls["cargo"].setValue(datos.cargo);
      this.fgValidador.controls["fechaInicio"].setValue(datos.fechaInicio);
      this.fgValidador.controls["credencial"].setValue(datos.credencial);
    });
  }
  EditarFuncionario() {
    let nombre = this.fgValidador.controls["nombre"].value;
    let apellidos = (this.fgValidador.controls["apellidos"].value);
    let telefono = (this.fgValidador.controls["telefono"].value);
    let direccion = (this.fgValidador.controls["direccion"].value);
    let correo = (this.fgValidador.controls["correo"].value);
    let departamento = (this.fgValidador.controls["departamento"].value);
    let cargo = (this.fgValidador.controls["cargo"].value);
    let fechaInicio = (this.fgValidador.controls["fechaInicio"].value);
    let credencial = (this.fgValidador.controls["credencial"].value);


    let p = new ModeloFuncionario();
    p.nombre= nombre;
    p.apellidos= apellidos;
    p.telefono= telefono;
    p.direccion= direccion;
    p.correo= correo;
    p.departamento= departamento;
    p.cargo= cargo;
    p.fechaInicio= fechaInicio;
    p.credencial= credencial;
    p.idFuncionario= this.idFuncionario;



    this.servicioFuncionario.ActualizarFuncionario(p).subscribe((datos: ModeloFuncionario) => {
      alert("Funcionario actualizado");
      this.router.navigate(["/administracion/listar-funcionarios"]);
    }, (error: any) => {
      alert("Error al actualizar")
    })
  }

}
