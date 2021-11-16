import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbHappyPetTwoDataSource} from '../datasources';
import {DetallesVisita, DetallesVisitaRelations} from '../models';

export class DetallesVisitaRepository extends DefaultCrudRepository<
  DetallesVisita,
  typeof DetallesVisita.prototype.idDetallesVisita,
  DetallesVisitaRelations
> {
  constructor(
    @inject('datasources.MongoDbHappyPetTwo') dataSource: MongoDbHappyPetTwoDataSource,
  ) {
    super(DetallesVisita, dataSource);
  }
}
