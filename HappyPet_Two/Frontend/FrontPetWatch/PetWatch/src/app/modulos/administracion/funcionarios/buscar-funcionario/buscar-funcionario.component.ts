import { Component, OnInit } from '@angular/core';
import { ModeloFuncionario } from 'src/app/modelos/funcionario.modelo';
import { FuncionarioService } from 'src/app/servicios/funcionario.service';

@Component({
  selector: 'app-buscar-funcionario',
  templateUrl: './buscar-funcionario.component.html',
  styleUrls: ['./buscar-funcionario.component.css']
})
export class BuscarFuncionarioComponent implements OnInit {
  listadoRegistros: ModeloFuncionario []= [];

  constructor(private funcionarioServicio: FuncionarioService) { }

  ngOnInit(): void {
    this.ObtenerListadoFuncionarios();
  }

  ObtenerListadoFuncionarios(){
    this.funcionarioServicio.ObtenerRegistros().subscribe((datos:ModeloFuncionario[])=>{
      this.listadoRegistros= datos;
    })
  }
}
