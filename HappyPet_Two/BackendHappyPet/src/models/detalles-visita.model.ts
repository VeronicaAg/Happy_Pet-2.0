import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Visita} from './visita.model';

@model()
export class DetallesVisita extends Entity {
  @property({
    type: 'string',             
    id: true,
    generated: true,
  })
  idDetallesVisita?: string;

  @property({
    type: 'number',
    required: true,
  })
  peso: number;

  @property({
    type: 'number',
    required: true,
  })
  temperatura: number;

  @property({
    type: 'number',
    required: true,
  })
  freqRespiratoria: number;

  @property({
    type: 'number',
    required: true,
  })
  freqCardiaca: number;

  @property({
    type: 'string',
    required: true,
  })
  estadoAnimo: string;

  @belongsTo(() => Visita)
  visitaId: string;

  constructor(data?: Partial<DetallesVisita>) {
    super(data);
  }
}

export interface DetallesVisitaRelations {
  // describe navigational properties here
}

export type DetallesVisitaWithRelations = DetallesVisita & DetallesVisitaRelations;
