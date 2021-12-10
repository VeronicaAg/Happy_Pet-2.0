import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  idProducto:string = '';

  fgValidador: FormGroup= this.fb.group({
    'idProducto':['', [Validators.required]],
    'nombreProducto': ['', [Validators.required]],
    'descripcionProducto': ['', [Validators.required]],
    'precioProducto': ['', [Validators.required]],
    'proveedores': ['', [Validators.required]]
  
  
  });

  constructor(private fb: FormBuilder,
    private servicioProducto: ProductoService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idProducto= this.route.snapshot.params["idProducto"];
    this.BuscarProducto();
  }

  BuscarProducto(){
    this.servicioProducto.ObtenerRegistroPorId(this.idProducto).subscribe((datos: ModeloProducto)=>{
      this.fgValidador.controls["idProducto"].setValue(this.idProducto);
      this.fgValidador.controls["nombreProducto"].setValue(datos.nombreProducto);
      this.fgValidador.controls["descripcionProducto"].setValue(datos.descripcionProducto);
      this.fgValidador.controls["precioProducto"].setValue(datos.precioProducto);
      this.fgValidador.controls["proveedores"].setValue(datos.proveedores);
     
    });
  }

  EditarProducto(){
    let nombreProducto = this.fgValidador.controls["nombreProducto"].value;
    let descripcionProducto = this.fgValidador.controls["descripcionProducto"].value;
    let precioProducto = parseInt(this.fgValidador.controls["precioProducto"].value);
    let proveedores = this.fgValidador.controls["proveedores"].value;
    

    let p= new ModeloProducto();
    p.nombreProducto= nombreProducto;
    p.descripcionProducto= descripcionProducto;
    p.precioProducto= precioProducto;
    p.proveedores= proveedores;
    p.idProducto= this.idProducto;

    this.servicioProducto.ActualizarProducto(p).subscribe((datos: ModeloProducto)=>{
      alert("Producto actualizado correctamente");
      this.router.navigate(["/administracion/listar-productos"]);
    },(error: any)=> {
      alert("Error actualizando el producto")
    })
  }

}
