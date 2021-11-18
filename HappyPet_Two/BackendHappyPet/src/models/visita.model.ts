import {Entity, model, property, hasOne} from '@loopback/repository';
import {DetallesVisita} from './detalles-visita.model';

@model()
export class Visita extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idVisita?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaVisita: string;

  @property({
    type: 'string',
  })
  mascotaId?: string;

  @property({
    type: 'string',
  })
  funcionarioId?: string;

  @hasOne(() => DetallesVisita)
  detallesVisita: DetallesVisita;

  constructor(data?: Partial<Visita>) {
    super(data);
  }
}

export interface VisitaRelations {
  // describe navigational properties here
}

export type VisitaWithRelations = Visita & VisitaRelations;
