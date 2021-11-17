import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model()
export class PedidoServicio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idPedidoS?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaCreacion: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaEjecucion: string;

  @property({
    type: 'string',
    required: true,
  })
  estadoPedido: string;

  @property({
    type: 'string',
    required: true,
  })
  metodoPago: string;

  @property({
    type: 'string',
    required: true,
  })
  observaciones: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  constructor(data?: Partial<PedidoServicio>) {
    super(data);
  }
}

export interface PedidoServicioRelations {
  // describe navigational properties here
}

export type PedidoServicioWithRelations = PedidoServicio & PedidoServicioRelations;
