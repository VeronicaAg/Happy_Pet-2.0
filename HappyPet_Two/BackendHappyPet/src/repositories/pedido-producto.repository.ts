import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbHappyPetTwoDataSource} from '../datasources';
import {PedidoProducto, PedidoProductoRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class PedidoProductoRepository extends DefaultCrudRepository<
  PedidoProducto,
  typeof PedidoProducto.prototype.idPedidoP,
  PedidoProductoRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof PedidoProducto.prototype.idPedidoP>;

  constructor(
    @inject('datasources.MongoDbHappyPetTwo') dataSource: MongoDbHappyPetTwoDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(PedidoProducto, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
