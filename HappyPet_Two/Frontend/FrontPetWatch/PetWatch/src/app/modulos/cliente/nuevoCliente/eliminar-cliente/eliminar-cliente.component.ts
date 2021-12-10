import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloCliente } from 'src/app/modelos/cliente.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-eliminar-cliente',
  templateUrl: './eliminar-cliente.component.html',
  styleUrls: ['./eliminar-cliente.component.css']
})
export class EliminarClienteComponent implements OnInit {
  idCliente:string = '';
  fgValidador: FormGroup = this.fb.group({
    'idCliente': ['', [Validators.required]],
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
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idCliente = this.route.snapshot.params["idCliente"];
    this.BuscarCliente();
  }

  BuscarCliente() {
    this.servicioCliente.ObtenerRegistroPorId(this.idCliente).subscribe((datos: ModeloCliente) => {
      this.fgValidador.controls["idCliente"].setValue(this.idCliente);
      this.fgValidador.controls["nombre"].setValue(datos.nombre);
      this.fgValidador.controls["apellidos"].setValue(datos.apellidos);
      this.fgValidador.controls["telefono"].setValue(datos.telefono);
      this.fgValidador.controls["direccion"].setValue(datos.direccion);
      this.fgValidador.controls["correo"].setValue(datos.correo);
      this.fgValidador.controls["ciudad"].setValue(datos.ciudad);
      this.fgValidador.controls["documento"].setValue(datos.documento);
    });
  }

  DeleteCliente(){

    this.servicioCliente.EliminarCliente(this.idCliente).subscribe((datos:ModeloCliente)=>{
      alert("Cliente eliminado");
      this.router.navigate(["/cliente/listar-clientes"]);
    }, (error: any) => {
      alert("Error al eliminarr")
    })
  }

}
