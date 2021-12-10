import { injectable, /* inject, */ BindingScope } from '@loopback/core';
import { FuncionarioRepository } from '../repositories';
import { Llaves } from '../config/llaves';
import { repository } from '@loopback/repository';
import {Funcionario} from '../models';
const generador = require('password-generator');
const cryptojS = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({ scope: BindingScope.TRANSIENT })
export class AutenticacionFuncionarioService {
  constructor(
    @repository(FuncionarioRepository)

    public funcionarioRepository: FuncionarioRepository

  ) { }

  GenerarClave() {
    const clave = generador(8, false);
    return clave;
  }

  CifrarClave(clave: string) {
    const claveCifrada = cryptojS.MD5(clave).toString();
    return claveCifrada;
  }

   IdentificarFuncionario(usuario: string, clave: string) {
    try
    {
      let f = this.funcionarioRepository.findOne({where: {correo: usuario, clave: clave}});
      if (f)
      {
        return f;
      }
      return false;
    } catch {
      return false;
    }
  }

    GenerarTokenJWTF(funcionario: Funcionario) {
    const token = jwt.sign({
      data: {
        id: funcionario.idFuncionario,
        correo: funcionario.correo,
        nombre: funcionario.nombre + " " + funcionario.apellidos,
        rol: "Funcionario"
      }
    },
      Llaves.claveJWT);
    return token;
  }

  ValidarTokenJWT(token: string) {
    try
    {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch {
      return false;
    }
  }
}
