import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongoDbHappyPetTwoDataSource} from '../datasources';
import {Producto, ProductoRelations, Proveedor, PedidoProducto, DetallesPedidoP} from '../models';
import {ProveedorRepository} from './proveedor.repository';
import {DetallesPedidoPRepository} from './detalles-pedido-p.repository';
import {PedidoProductoRepository} from './pedido-producto.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.idProducto,
  ProductoRelations
> {

  public readonly proveedor: BelongsToAccessor<Proveedor, typeof Producto.prototype.idProducto>;

  public readonly pedidoProductos: HasManyThroughRepositoryFactory<PedidoProducto, typeof PedidoProducto.prototype.idPedidoP,
          DetallesPedidoP,
          typeof Producto.prototype.idProducto
        >;

  constructor(
    @inject('datasources.MongoDbHappyPetTwo') dataSource: MongoDbHappyPetTwoDataSource, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>, @repository.getter('DetallesPedidoPRepository') protected detallesPedidoPRepositoryGetter: Getter<DetallesPedidoPRepository>, @repository.getter('PedidoProductoRepository') protected pedidoProductoRepositoryGetter: Getter<PedidoProductoRepository>,
  ) {
    super(Producto, dataSource);
    this.pedidoProductos = this.createHasManyThroughRepositoryFactoryFor('pedidoProductos', pedidoProductoRepositoryGetter, detallesPedidoPRepositoryGetter,);
    this.registerInclusionResolver('pedidoProductos', this.pedidoProductos.inclusionResolver);
    this.proveedor = this.createBelongsToAccessorFor('proveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedor', this.proveedor.inclusionResolver);
  }
}
