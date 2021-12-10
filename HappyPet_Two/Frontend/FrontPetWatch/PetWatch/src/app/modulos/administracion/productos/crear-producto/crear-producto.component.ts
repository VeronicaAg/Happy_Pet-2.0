import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  fgValidador: FormGroup= this.fb.group({
    'nombreProducto': ['', [Validators.required]],
    'descripcionProducto': ['', [Validators.required]],
    'precioProducto': ['', [Validators.required]],
    'proveedores': ['', [Validators.required]]
  
  });

  constructor(private fb: FormBuilder,
    private servicioProducto: ProductoService,
    private router: Router) { }

  ngOnInit(): void {
  }

  GuardarProducto(){
    let nombreProducto = this.fgValidador.controls["nombreProducto"].value;
    let descripcionProducto = (this.fgValidador.controls["descripcionProducto"].value);
    let precioProducto = parseInt(this.fgValidador.controls["precioProducto"].value);
    let proveedores = (this.fgValidador.controls["proveedores"].value);

    let p= new ModeloProducto();
    p.nombreProducto= nombreProducto;
    p.descripcionProducto= descripcionProducto;
    p.precioProducto= precioProducto;
    p.proveedores= proveedores;

    this.servicioProducto.CrearProducto(p).subscribe((datos: ModeloProducto)=>{
      alert("Producto almacenado correctamente");
      this.router.navigate(["/administracion/listar-productos"]);
    },(error: any)=> {
      alert("Error almacenando el producto")
    })
  }
}
