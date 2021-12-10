import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloCliente } from 'src/app/modelos/cliente.modelo';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
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
  EditarCliente() {
    let nombre = this.fgValidador.controls["nombre"].value;
    let apellidos = this.fgValidador.controls["apellidos"].value;
    let telefono = this.fgValidador.controls["telefono"].value;
    let direccion = this.fgValidador.controls["direccion"].value;
    let correo = this.fgValidador.controls["correo"].value;
    let ciudad = this.fgValidador.controls["ciudad"].value;
    let documento = this.fgValidador.controls["documento"].value;


    let p = new ModeloCliente();
    p.nombre = nombre;
    p.apellidos = apellidos;
    p.telefono = telefono;
    p.direccion = direccion;
    p.correo = correo;
    p.ciudad = ciudad;
    p.documento = documento;
    p.idCliente= this.idCliente;



    this.servicioCliente.ActualizarCliente(p).subscribe((datos: ModeloCliente) => {
      alert("Cliente actualizado");
      this.router.navigate(["/cliente/listar-clientes"]);
    }, (error: any) => {
      alert("Error al actualizar")
    })
  }
}
