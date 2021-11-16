import {Entity, model, property} from '@loopback/repository';

@model()
export class DetallesPedidoP extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idDetallesPedidoP?: string;

  @property({
    type: 'number',
    required: true,
  })
  precioUnitario: number;

  @property({
    type: 'number',
    required: true,
  })
  precioTotal: number;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  constructor(data?: Partial<DetallesPedidoP>) {
    super(data);
  }
}

export interface DetallesPedidoPRelations {
  // describe navigational properties here
}

export type DetallesPedidoPWithRelations = DetallesPedidoP &
  DetallesPedidoPRelations;
