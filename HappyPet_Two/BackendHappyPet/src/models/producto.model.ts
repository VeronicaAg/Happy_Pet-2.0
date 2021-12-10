import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Proveedor} from './proveedor.model';
import {PedidoProducto} from './pedido-producto.model';
import {DetallesPedidoP} from './detalles-pedido-p.model';

@model()
export class Producto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idProducto?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreProducto: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcionProducto: string;

  @property({
    type: 'number',
    required: true,
  })
  precioProducto: number;

  @property({
    type: 'string',
    required: true,
  })
  proveedores: string;

  @belongsTo(() => Proveedor)
  proveedorId: string;

  @hasMany(() => PedidoProducto, {through: {model: () => DetallesPedidoP}})
  pedidoProductos: PedidoProducto[];

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
