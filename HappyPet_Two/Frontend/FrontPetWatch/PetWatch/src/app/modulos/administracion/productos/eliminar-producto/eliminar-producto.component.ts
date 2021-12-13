import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css']
})
export class EliminarProductoComponent implements OnInit {
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

  DeleteProducto(){
    this.servicioProducto.EliminarProducto(this.idProducto).subscribe((datos: ModeloProducto)=>{
      alert("Producto eliminado");
      this.router.navigate(["/administracion/listar-productos"]);
    },(error: any)=> {
      alert("Error al eliminar")
    })
  }


}
