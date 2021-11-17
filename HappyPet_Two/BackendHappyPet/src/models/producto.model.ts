import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Proveedor} from './proveedor.model';

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

  @belongsTo(() => Proveedor)
  proveedorId: string;

  constructor(data?: Partial<Producto>) {
    super(data);
  }
}

export interface ProductoRelations {
  // describe navigational properties here
}

export type ProductoWithRelations = Producto & ProductoRelations;
