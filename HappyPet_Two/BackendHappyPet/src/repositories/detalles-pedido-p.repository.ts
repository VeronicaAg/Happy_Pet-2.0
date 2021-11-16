import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbHappyPetTwoDataSource} from '../datasources';
import {DetallesPedidoP, DetallesPedidoPRelations} from '../models';

export class DetallesPedidoPRepository extends DefaultCrudRepository<
  DetallesPedidoP,
  typeof DetallesPedidoP.prototype.idDetallesPedidoP,
  DetallesPedidoPRelations
> {
  constructor(
    @inject('datasources.MongoDbHappyPetTwo') dataSource: MongoDbHappyPetTwoDataSource,
  ) {
    super(DetallesPedidoP, dataSource);
  }
}
