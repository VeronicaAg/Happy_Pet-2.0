import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloCliente } from 'src/app/modelos/cliente.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {
  fgValidador: FormGroup= this.fb.group({
    'nombre': ['', [Validators.required]],
    'apellidos': ['', [Validators.required]],
    'documento': ['', [Validators.required]],
    'telefono': ['', [Validators.required]],
    'correo': ['', [Validators.required]],
    'ciudad': ['', [Validators.required]],
    'direccion': ['', [Validators.required]],

  });

  constructor(private fb: FormBuilder,
    private servicioCliente: ClienteService,
    private router: Router) { }

  ngOnInit(): void {
  }

  GuardarCliente(){
    let nombre = this.fgValidador.controls["nombre"].value;
    let apellidos = (this.fgValidador.controls["apellidos"].value);
    let telefono = (this.fgValidador.controls["telefono"].value);
    let direccion = (this.fgValidador.controls["direccion"].value);
    let correo = (this.fgValidador.controls["correo"].value);
    let ciudad = (this.fgValidador.controls["ciudad"].value);
    let documento = (this.fgValidador.controls["documento"].value);


    let p= new ModeloCliente();
    p.nombre= nombre;
    p.apellidos= apellidos;
    p.telefono= telefono;
    p.direccion= direccion;
    p.correo= correo;
    p.ciudad= ciudad;
    p.documento= documento;



    this.servicioCliente.CrearCliente(p).subscribe((datos: ModeloCliente)=>{
      alert("Has sido registrado Correctamente");
      this.router.navigate(["/inicio"]);
    },(error: any)=> {
      alert("Error al registrarse")
    })
  }

}
