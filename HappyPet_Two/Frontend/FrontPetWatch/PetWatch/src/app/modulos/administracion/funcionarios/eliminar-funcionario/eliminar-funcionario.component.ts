import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloFuncionario } from 'src/app/modelos/funcionario.modelo';
import { FuncionarioService } from 'src/app/servicios/funcionario.service';

@Component({
  selector: 'app-eliminar-funcionario',
  templateUrl: './eliminar-funcionario.component.html',
  styleUrls: ['./eliminar-funcionario.component.css']
})
export class EliminarFuncionarioComponent implements OnInit {

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

  DeleteFuncionario(){

    this.servicioFuncionario.EliminarFuncionario(this.idFuncionario).subscribe((datos:ModeloFuncionario)=>{
      alert("Funcionario eliminado");
      this.router.navigate(["/administracion/listar-funcionarios"]);
    }, (error: any) => {
      alert("Error al eliminarr")
    })
  }

}
