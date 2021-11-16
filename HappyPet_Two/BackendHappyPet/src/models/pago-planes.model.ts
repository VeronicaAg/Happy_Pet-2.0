import {Entity, model, property} from '@loopback/repository';

@model()
export class PagoPlanes extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idPago?: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;


  constructor(data?: Partial<PagoPlanes>) {
    super(data);
  }
}

export interface PagoPlanesRelations {
  // describe navigational properties here
}

export type PagoPlanesWithRelations = PagoPlanes & PagoPlanesRelations;
