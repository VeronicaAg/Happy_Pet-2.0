import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Cliente, Funcionario} from '../models';
import {ClienteRepository, FuncionarioRepository} from '../repositories';
import {Llaves} from '../config/llaves';
const generador = require('password-generator');
const cryptojS = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(ClienteRepository)
    @repository(FuncionarioRepository)
        public clienteRepository: ClienteRepository,
        public funcionarioRepository: FuncionarioRepository

  ) { }

  /*
   * Add service methods here
   */

  GenerarClave() {
    const clave = generador(8, false);
    return clave;
  }

  CifrarClave(clave: string) {
    const claveCifrada = cryptojS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarCliente(usuario: string, clave: string) {
    try
    {
      let c = this.clienteRepository.findOne({where: {correo: usuario, clave: clave}});
      if (c)
      {
        return c;
      }
      return false;
    } catch {
      return false;
    }
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

  GenerarTokenJWTC(cliente: Cliente) {
    const token = jwt.sign({
      data: {
        id: cliente.idCliente,
        correo: cliente.correo,
        nombre: cliente.nombre + " " + cliente.apellidos,
        rol: "Cliente"
      }
    },
      Llaves.claveJWT);
    return token;
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
