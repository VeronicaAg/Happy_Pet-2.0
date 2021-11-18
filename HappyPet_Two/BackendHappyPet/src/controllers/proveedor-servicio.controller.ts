import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Proveedor,
  Servicio,
} from '../models';
import {ProveedorRepository} from '../repositories';

export class ProveedorServicioController {
  constructor(
    @repository(ProveedorRepository) protected proveedorRepository: ProveedorRepository,
  ) { }

  @get('/proveedors/{id}/servicios', {
    responses: {
      '200': {
        description: 'Array of Proveedor has many Servicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Servicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Servicio>,
  ): Promise<Servicio[]> {
    return this.proveedorRepository.servicios(id).find(filter);
  }

  @post('/proveedors/{id}/servicios', {
    responses: {
      '200': {
        description: 'Proveedor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Servicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Proveedor.prototype.idProveedor,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {
            title: 'NewServicioInProveedor',
            exclude: ['idServicio'],
            optional: ['proveedorId']
          }),
        },
      },
    }) servicio: Omit<Servicio, 'idServicio'>,
  ): Promise<Servicio> {
    return this.proveedorRepository.servicios(id).create(servicio);
  }

  @patch('/proveedors/{id}/servicios', {
    responses: {
      '200': {
        description: 'Proveedor.Servicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {partial: true}),
        },
      },
    })
    servicio: Partial<Servicio>,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.proveedorRepository.servicios(id).patch(servicio, where);
  }

  @del('/proveedors/{id}/servicios', {
    responses: {
      '200': {
        description: 'Proveedor.Servicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Servicio)) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.proveedorRepository.servicios(id).delete(where);
  }
}
