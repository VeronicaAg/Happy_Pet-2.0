import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbHappyPetTwoDataSource} from '../datasources';
import {Producto, ProductoRelations, Proveedor} from '../models';
import {ProveedorRepository} from './proveedor.repository';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.idProducto,
  ProductoRelations
> {

  public readonly proveedor: BelongsToAccessor<Proveedor, typeof Producto.prototype.idProducto>;

  constructor(
    @inject('datasources.MongoDbHappyPetTwo') dataSource: MongoDbHappyPetTwoDataSource, @repository.getter('ProveedorRepository') protected proveedorRepositoryGetter: Getter<ProveedorRepository>,
  ) {
    super(Producto, dataSource);
    this.proveedor = this.createBelongsToAccessorFor('proveedor', proveedorRepositoryGetter,);
    this.registerInclusionResolver('proveedor', this.proveedor.inclusionResolver);
  }
}
