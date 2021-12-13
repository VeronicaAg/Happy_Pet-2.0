import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloMascota } from '../modelos/mascota.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {
  url= 'http://localhost:3000';
  token: String = '';

  constructor(private http: HttpClient, private seguridadServicio: SeguridadService) { 
    this.token = this.seguridadServicio.ObtenerToken();
  }

  ObtenerRegistros(): Observable<ModeloMascota[]> {
    return this.http.get<ModeloMascota[]>(`${this.url}/mascotas`);
  }

  ObtenerRegistroPorId(idMascota:string): Observable<ModeloMascota> {
    return this.http.get<ModeloMascota>(`${this.url}/mascotas/${idMascota}`);
  }

  CrearMascota(mascota: ModeloMascota): Observable<ModeloMascota>{
    return this.http.post<ModeloMascota>(`${this.url}/clientes/${mascota.clienteId}/mascotas`,mascota,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.token} `
      })
    })
  }

  ActualizarMascota(mascota: ModeloMascota): Observable<ModeloMascota>{
    return this.http.put<ModeloMascota>(`${this.url}/mascotas/${mascota.idMascota}`,mascota,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.token} `
      })
    })
  }

  EliminarMascota(idMascota: string): Observable<any>{
    return this.http.delete(`${this.url}/mascotas/${idMascota}`,{
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.token} `
      })
    })
  }
}
