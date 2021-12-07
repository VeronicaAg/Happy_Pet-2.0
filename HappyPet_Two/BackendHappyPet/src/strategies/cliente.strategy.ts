import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {AutenticacionService} from '../services';
export class EstrategiaCliente implements AuthenticationStrategy {
  name: string = 'custommer';
constructor(
  @service(AutenticacionService)
  public servicioAutenticacion : AutenticacionService
){
}
  async authenticate(request: Request): Promise<UserProfile | undefined>{
    let token = parseBearerToken(request);
    if(token){
      let datos = this.servicioAutenticacion.ValidarTokenJWT(token);
      if(datos){
        let perfil: UserProfile = Object.assign({
          nombre: datos.data.nombre
        });
        return perfil;
      }else{
        throw new HttpErrors[401]("El token inlcuido no es válido.")
      }
    }else{
      throw new HttpErrors[401]("No ha incluido un token en la solicitud.")
    }
  }
}