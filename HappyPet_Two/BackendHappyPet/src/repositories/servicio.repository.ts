import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongoDbHappyPetTwoDataSource} from '../datasources';
import {Servicio, ServicioRelations, Proveedor, PedidoServicio, DetallesPedidoS} from '../models';
import {ProveedorRepository} from './proveedor.repository';
import {DetallesPedidoSRepository} from './detalles-pedido-s.repository';
import {PedidoServicioRepository} from './pedido-servicio.repository';

export class ServicioRepository extends DefaultCrudRepository<
  Servicio,
  typeof Servicio.prototype.idServicio,
  ServicioRelations
> {

  public readonly proveedor: BelongsToAccessor<Proveedor, typeof Servicio.prototype.idServicio>;

  public readonly pedidoServicios: HasManyThroughRepositoryFactory<PedidoServicio, typeof PedidoServicio.prototype.idPedidoS,
          DetallesPedidoS,
          typeof Servicio.prototype.idServicio
        >;

  constructor(
    @inject('datasources.MongoDbHappyPetTwo') dataSource: MongoDbHappyPetTwoDataSource, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>, @repository.getter('DetallesPedidoSRepository') protected detallesPedidoSRepositoryGetter: Getter<DetallesPedidoSRepository>, @repository.getter('PedidoServicioRepository') protected pedidoServicioRepositoryGetter: Getter<PedidoServicioRepository>,
  ) {
    super(Servicio, dataSource);
    this.pedidoServicios = this.createHasManyThroughRepositoryFactoryFor('pedidoServicios', pedidoServicioRepositoryGetter, detallesPedidoSRepositoryGetter,);
    this.registerInclusionResolver('pedidoServicios', this.pedidoServicios.inclusionResolver);
    this.proveedor = this.createBelongsToAccessorFor('proveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedor', this.proveedor.inclusionResolver);
  }
}
