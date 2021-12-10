import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloPlan } from '../modelos/plan.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  url= 'http://localhost:3000';
  token: String = '';

  constructor(private http: HttpClient, private seguridadServicio: SeguridadService) { 
    this.token = this.seguridadServicio.ObtenerToken();
  }

  ObtenerRegistros(): Observable<ModeloPlan[]> {
    return this.http.get<ModeloPlan[]>(`${this.url}/plans`);
  }

  ObtenerRegistroPorId(idPlan:string): Observable<ModeloPlan> {
    return this.http.get<ModeloPlan>(`${this.url}/plans/${idPlan}`);
  }

  CrearPlan(plan: ModeloPlan): Observable<ModeloPlan>{
    return this.http.post<ModeloPlan>(`${this.url}/plans`,plan,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.token} `
      })
    })
  }

  ActualizarPlan(plan: ModeloPlan): Observable<ModeloPlan>{
    return this.http.put<ModeloPlan>(`${this.url}/plans/${plan.idPlan}`,plan,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.token} `
      })
    })
  }

  EliminarPlan(idPlan: string): Observable<any>{
    return this.http.delete(`${this.url}/plans/${idPlan}`,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.token} `
      })
    })
  }
}
