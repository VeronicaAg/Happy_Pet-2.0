import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloMascota } from 'src/app/modelos/mascota.modelo';
import { MascotaService } from 'src/app/servicios/mascota.service';

@Component({
  selector: 'app-crear-mascota',
  templateUrl: './crear-mascota.component.html',
  styleUrls: ['./crear-mascota.component.css']
})
export class CrearMascotaComponent implements OnInit {
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
    private servicioMascota: MascotaService,
    private router: Router) { }

  ngOnInit(): void {
  }

  GuardarMascota(){
    let nombreMascota = this.fgValidador.controls["nombreMascota"].value;
    let raza = (this.fgValidador.controls["raza"].value);
    let especie = (this.fgValidador.controls["especie"].value);
    let edad = (this.fgValidador.controls["edad"].value);
    let genero = (this.fgValidador.controls["genero"].value);
    let imagen = (this.fgValidador.controls["imagen"].value);
    let clienteId = (this.fgValidador.controls["clienteId"].value);


    let p= new ModeloMascota();
    p.nombreMascota= nombreMascota;
    p.raza= raza;
    p.especie= especie;
    p.edad= edad;
    p.genero= genero;
    p.imagen= imagen;
    p.clienteId= clienteId;



    this.servicioMascota.CrearMascota(p).subscribe((datos: ModeloMascota)=>{
      alert("Envío de solicitud de afiliacion Exitoso");
      this.router.navigate(["/inicio"]);
    },(error: any)=> {
      alert("Error en el intento de afiliación de Mascota")
    })
  }


}
