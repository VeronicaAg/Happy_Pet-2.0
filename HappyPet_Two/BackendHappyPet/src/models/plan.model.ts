import {Entity, model, property, hasMany} from '@loopback/repository';
import {Mascota} from './mascota.model';
import {PagoPlanes} from './pago-planes.model';

@model()
export class Plan extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idPlan?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombrePlan: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  precioPlan: number;

  @property({
    type: 'string',
    required: true,
  })
  proveedores: string;

  @hasMany(() => Mascota, {through: {model: () => PagoPlanes}})
  mascotas: Mascota[];

  constructor(data?: Partial<Plan>) {
    super(data);
  }
}

export interface PlanRelations {
  // describe navigational properties here
}

export type PlanWithRelations = Plan & PlanRelations;
