import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  fgValidador: FormGroup = this.fb.group({
    'usuario': ['',[Validators.required, Validators.email]],
    'clave': ['',[Validators.required]]
  });

  constructor(private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router) { }

  ngOnInit(): void {
  }

  IdentificarCliente(){
    let usuario = this.fgValidador.controls["usuario"].value;
    let clave = this.fgValidador.controls["clave"].value;
    let claveCifrada = CryptoJS.MD5(clave).toString();
    this.servicioSeguridad.IdentificacionCliente(usuario, claveCifrada).subscribe((datos:any)=> {
      this.servicioSeguridad.AlmacenarSesion(datos);
      this.router.navigate(["/inicio"]);
      // //OK
      alert("Datos Correctos")
    }, (error: any)=> {
      //KO
      alert("Datos invalidos")
    })
  }

}
