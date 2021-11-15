import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbHappyPetTwoDataSource} from '../datasources';
import {PedidoProducto, PedidoProductoRelations} from '../models';

export class PedidoProductoRepository extends DefaultCrudRepository<
  PedidoProducto,
  typeof PedidoProducto.prototype.idPedidoP,
  PedidoProductoRelations
> {
  constructor(
    @inject('datasources.MongoDbHappyPetTwo') dataSource: MongoDbHappyPetTwoDataSource,
  ) {
    super(PedidoProducto, dataSource);
  }
}
