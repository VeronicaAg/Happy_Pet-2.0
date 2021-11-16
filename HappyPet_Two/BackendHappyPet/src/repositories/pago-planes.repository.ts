import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbHappyPetTwoDataSource} from '../datasources';
import {PagoPlanes, PagoPlanesRelations} from '../models';

export class PagoPlanesRepository extends DefaultCrudRepository<
  PagoPlanes,
  typeof PagoPlanes.prototype.idPago,
  PagoPlanesRelations
> {
  constructor(
    @inject('datasources.MongoDbHappyPetTwo') dataSource: MongoDbHappyPetTwoDataSource,
  ) {
    super(PagoPlanes, dataSource);
  }
}
