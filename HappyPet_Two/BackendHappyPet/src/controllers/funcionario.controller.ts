import { service } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import { Funcionario, Usuario } from '../models';
import { FuncionarioRepository } from '../repositories';
import {AutenticacionFuncionarioService  } from '../services';
const fetch = require('node-fetch');

export class FuncionarioController {
  constructor(
    @repository(FuncionarioRepository)
    public funcionarioRepository: FuncionarioRepository,
    @service(AutenticacionFuncionarioService )
    public servicioAutenticacion: AutenticacionFuncionarioService 
  ) { }

  @post("/identificarFuncionario", {
    responses: {
      '200': {
        description: "Identificacion de funcionarios"
      }
    }
  })
  async identificarFuncionario(
    @requestBody() usuario: Usuario
  ){
    let f = await this.servicioAutenticacion.IdentificarFuncionario(usuario.usuario, usuario.clave);
    if(f)
    {
      let token = this.servicioAutenticacion.GenerarTokenJWTF(f);
      return{
        datos: {
          nombre: f.nombre,
          correo: f.apellidos,
          id: f.idFuncionario
        },
        tk: token
      }
    }else
    {
      throw new HttpErrors[401]("Datos Inválidos")
    }
  }

  @post('/funcionarios')
  @response(200, {
    description: 'Funcionario model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Funcionario) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Funcionario, {
            title: 'NewFuncionario',
            exclude: ['idFuncionario'],
          }),
        },
      },
    })
    funcionario: Omit<Funcionario, 'idFuncionario'>,
  ): Promise<Funcionario> {
    let clave = this.servicioAutenticacion.GenerarClave();
    let claveCifrada = this.servicioAutenticacion.CifrarClave(clave);
    funcionario.clave = claveCifrada;
    let f = await this.funcionarioRepository.create(funcionario);

    //Notificar al usuario por correo
    // let destino = funcionario.correo;
    // let asunto = 'Registro en la Plaraforma';
    // let contenido = `Hola ${funcionario.nombre} ${funcionario.apellidos}, su nombre usuario es: ${funcionario.correo} y su contraseña es ${clave}`;
    // fetch (`http://127.0.0.1:5000/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
    // .then((data:any)=>{
    //   console.log(data);
    // })
    // return f;

    //Notificar al usuario por sms
    let destinoT = funcionario.telefono;
    let destinoC = funcionario.correo;
    let asunto = 'Registro en la Plaraforma';
    let contenido = `Hola ${funcionario.nombre} ${funcionario.apellidos}, su nombre usuario es: ${funcionario.correo} y su contraseña es ${clave}`;
    fetch(`http://127.0.0.1:5000/sms?telefono=${destinoT}&mensaje=${contenido}`)
    fetch(`http://127.0.0.1:5000/envio-correo?correo_destino=${destinoC}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {
        console.log(data);
      })
    return f;

  }

  @get('/funcionarios/count')
  @response(200, {
    description: 'Funcionario model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(Funcionario) where?: Where<Funcionario>,
  ): Promise<Count> {
    return this.funcionarioRepository.count(where);
  }

  @get('/funcionarios')
  @response(200, {
    description: 'Array of Funcionario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Funcionario, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(Funcionario) filter?: Filter<Funcionario>,
  ): Promise<Funcionario[]> {
    return this.funcionarioRepository.find(filter);
  }

  @patch('/funcionarios')
  @response(200, {
    description: 'Funcionario PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Funcionario, { partial: true }),
        },
      },
    })
    funcionario: Funcionario,
    @param.where(Funcionario) where?: Where<Funcionario>,
  ): Promise<Count> {
    return this.funcionarioRepository.updateAll(funcionario, where);
  }

  @get('/funcionarios/{id}')
  @response(200, {
    description: 'Funcionario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Funcionario, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Funcionario, { exclude: 'where' }) filter?: FilterExcludingWhere<Funcionario>
  ): Promise<Funcionario> {
    return this.funcionarioRepository.findById(id, filter);
  }

  @patch('/funcionarios/{id}')
  @response(204, {
    description: 'Funcionario PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Funcionario, { partial: true }),
        },
      },
    })
    funcionario: Funcionario,
  ): Promise<void> {
    await this.funcionarioRepository.updateById(id, funcionario);
  }

  @put('/funcionarios/{id}')
  @response(204, {
    description: 'Funcionario PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() funcionario: Funcionario,
  ): Promise<void> {
    await this.funcionarioRepository.replaceById(id, funcionario);
  }

  @del('/funcionarios/{id}')
  @response(204, {
    description: 'Funcionario DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.funcionarioRepository.deleteById(id);
  }
}
