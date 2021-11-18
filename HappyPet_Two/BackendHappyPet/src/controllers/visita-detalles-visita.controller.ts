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
  Visita,
  DetallesVisita,
} from '../models';
import {VisitaRepository} from '../repositories';

export class VisitaDetallesVisitaController {
  constructor(
    @repository(VisitaRepository) protected visitaRepository: VisitaRepository,
  ) { }

  @get('/visitas/{id}/detalles-visita', {
    responses: {
      '200': {
        description: 'Visita has one DetallesVisita',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DetallesVisita),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<DetallesVisita>,
  ): Promise<DetallesVisita> {
    return this.visitaRepository.detallesVisita(id).get(filter);
  }

  @post('/visitas/{id}/detalles-visita', {
    responses: {
      '200': {
        description: 'Visita model instance',
        content: {'application/json': {schema: getModelSchemaRef(DetallesVisita)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Visita.prototype.idVisita,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallesVisita, {
            title: 'NewDetallesVisitaInVisita',
            exclude: ['idDetallesVisita'],
            optional: ['visitaId']
          }),
        },
      },
    }) detallesVisita: Omit<DetallesVisita, 'idDetallesVisita'>,
  ): Promise<DetallesVisita> {
    return this.visitaRepository.detallesVisita(id).create(detallesVisita);
  }

  @patch('/visitas/{id}/detalles-visita', {
    responses: {
      '200': {
        description: 'Visita.DetallesVisita PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DetallesVisita, {partial: true}),
        },
      },
    })
    detallesVisita: Partial<DetallesVisita>,
    @param.query.object('where', getWhereSchemaFor(DetallesVisita)) where?: Where<DetallesVisita>,
  ): Promise<Count> {
    return this.visitaRepository.detallesVisita(id).patch(detallesVisita, where);
  }

  @del('/visitas/{id}/detalles-visita', {
    responses: {
      '200': {
        description: 'Visita.DetallesVisita DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DetallesVisita)) where?: Where<DetallesVisita>,
  ): Promise<Count> {
    return this.visitaRepository.detallesVisita(id).delete(where);
  }
}
