import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Proveedor} from './proveedor.model';
import {PedidoServicio} from './pedido-servicio.model';
import {DetallesPedidoS} from './detalles-pedido-s.model';

@model()
export class Servicio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idServicio?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreServicio: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  precioServicio: number;

  @belongsTo(() => Proveedor)
  proveedorId: string;

  @hasMany(() => PedidoServicio, {through: {model: () => DetallesPedidoS}})
  pedidoServicios: PedidoServicio[];

  constructor(data?: Partial<Servicio>) {
    super(data);
  }
}

export interface ServicioRelations {
  // describe navigational properties here
}

export type ServicioWithRelations = Servicio & ServicioRelations;
