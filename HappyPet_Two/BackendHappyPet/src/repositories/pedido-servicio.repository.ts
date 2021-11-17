import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbHappyPetTwoDataSource} from '../datasources';
import {PedidoServicio, PedidoServicioRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class PedidoServicioRepository extends DefaultCrudRepository<
  PedidoServicio,
  typeof PedidoServicio.prototype.idPedidoS,
  PedidoServicioRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof PedidoServicio.prototype.idPedidoS>;

  constructor(
    @inject('datasources.MongoDbHappyPetTwo') dataSource: MongoDbHappyPetTwoDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(PedidoServicio, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
