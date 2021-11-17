import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model()
export class PedidoProducto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idPedidoP?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaCreacion: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaEntrega: string;

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
  obcervaciones: string;

  @belongsTo(() => Cliente)
  clienteId: string;

  constructor(data?: Partial<PedidoProducto>) {
    super(data);
  }
}

export interface PedidoProductoRelations {
  // describe navigational properties here
}

export type PedidoProductoWithRelations = PedidoProducto & PedidoProductoRelations;
