import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbHappyPetTwoDataSource} from '../datasources';
import {Cliente, ClienteRelations, PedidoProducto, PedidoServicio, Mascota} from '../models';
import {PedidoProductoRepository} from './pedido-producto.repository';
import {PedidoServicioRepository} from './pedido-servicio.repository';
import {MascotaRepository} from './mascota.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.idCliente,
  ClienteRelations
> {

  public readonly pedidoProductos: HasManyRepositoryFactory<PedidoProducto, typeof Cliente.prototype.idCliente>;

  public readonly pedidoServicios: HasManyRepositoryFactory<PedidoServicio, typeof Cliente.prototype.idCliente>;

  public readonly mascotas: HasManyRepositoryFactory<Mascota, typeof Cliente.prototype.idCliente>;

  constructor(
    @inject('datasources.MongoDbHappyPetTwo') dataSource: MongoDbHappyPetTwoDataSource, @repository.getter('PedidoProductoRepository') protected pedidoProductoRepositoryGetter: Getter<PedidoProductoRepository>, @repository.getter('PedidoServicioRepository') protected pedidoServicioRepositoryGetter: Getter<PedidoServicioRepository>, @repository.getter('MascotaRepository') protected mascotaRepositoryGetter: Getter<MascotaRepository>,
  ) {
    super(Cliente, dataSource);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotaRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
    this.pedidoServicios = this.createHasManyRepositoryFactoryFor('pedidoServicios', pedidoServicioRepositoryGetter,);
    this.registerInclusionResolver('pedidoServicios', this.pedidoServicios.inclusionResolver);
    this.pedidoProductos = this.createHasManyRepositoryFactoryFor('pedidoProductos', pedidoProductoRepositoryGetter,);
    this.registerInclusionResolver('pedidoProductos', this.pedidoProductos.inclusionResolver);
  }
}
