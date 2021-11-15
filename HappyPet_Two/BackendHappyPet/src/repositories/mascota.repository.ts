import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbHappyPetTwoDataSource} from '../datasources';
import {Mascota, MascotaRelations} from '../models';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.idMascota,
  MascotaRelations
> {
  constructor(
    @inject('datasources.MongoDbHappyPetTwo') dataSource: MongoDbHappyPetTwoDataSource,
  ) {
    super(Mascota, dataSource);
  }
}
