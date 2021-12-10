import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloFuncionario } from '../modelos/funcionario.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  url= 'http://localhost:3000';
  token: String = '';

  constructor(private http: HttpClient, private seguridadServicio: SeguridadService) {
    this.token = this.seguridadServicio.ObtenerToken();
   }

   ObtenerRegistros(): Observable<ModeloFuncionario[]> {
    return this.http.get<ModeloFuncionario[]>(`${this.url}/funcionarios`);
  }

  ObtenerRegistroPorId(idFuncionario:string): Observable<ModeloFuncionario> {
    return this.http.get<ModeloFuncionario>(`${this.url}/funcionarios/${idFuncionario}`);
  }

  CrearFuncionario(funcionario: ModeloFuncionario): Observable<ModeloFuncionario>{
    return this.http.post<ModeloFuncionario>(`${this.url}/funcionarios`,funcionario,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.token} `
      })
    })
  }

  ActualizarFuncionario(funcionario: ModeloFuncionario): Observable<ModeloFuncionario>{
    return this.http.put<ModeloFuncionario>(`${this.url}/funcionarios/${funcionario.idFuncionario}`,funcionario,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.token} `
      })
    })
  }

  EliminarFuncionario(idFuncionario: string): Observable<any>{
    return this.http.delete(`${this.url}/funcionarios/${idFuncionario}`,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.token} `
      })
    })
  }
}
