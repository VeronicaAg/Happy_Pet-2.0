import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbHappyPetTwoDataSource} from '../datasources';
import {PedidoServicio, PedidoServicioRelations} from '../models';

export class PedidoServicioRepository extends DefaultCrudRepository<
  PedidoServicio,
  typeof PedidoServicio.prototype.idPedidoS,
  PedidoServicioRelations
> {
  constructor(
    @inject('datasources.MongoDbHappyPetTwo') dataSource: MongoDbHappyPetTwoDataSource,
  ) {
    super(PedidoServicio, dataSource);
  }
}
