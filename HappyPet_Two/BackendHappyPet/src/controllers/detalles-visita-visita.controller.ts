import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DetallesVisita,
  Visita,
} from '../models';
import {DetallesVisitaRepository} from '../repositories';

export class DetallesVisitaVisitaController {
  constructor(
    @repository(DetallesVisitaRepository)
    public detallesVisitaRepository: DetallesVisitaRepository,
  ) { }

  @get('/detalles-visitas/{id}/visita', {
    responses: {
      '200': {
        description: 'Visita belonging to DetallesVisita',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Visita)},
          },
        },
      },
    },
  })
  async getVisita(
    @param.path.string('id') id: typeof DetallesVisita.prototype.idDetallesVisita,
  ): Promise<Visita> {
    return this.detallesVisitaRepository.visita(id);
  }
}
