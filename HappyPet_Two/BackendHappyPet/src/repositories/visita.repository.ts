import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDbHappyPetTwoDataSource} from '../datasources';
import {Visita, VisitaRelations, DetallesVisita} from '../models';
import {DetallesVisitaRepository} from './detalles-visita.repository';

export class VisitaRepository extends DefaultCrudRepository<
  Visita,
  typeof Visita.prototype.idVisita,
  VisitaRelations
> {

  public readonly detallesVisita: HasOneRepositoryFactory<DetallesVisita, typeof Visita.prototype.idVisita>;

  constructor(
    @inject('datasources.MongoDbHappyPetTwo') dataSource: MongoDbHappyPetTwoDataSource, @repository.getter('DetallesVisitaRepository') protected detallesVisitaRepositoryGetter: Getter<DetallesVisitaRepository>,
  ) {
    super(Visita, dataSource);
    this.detallesVisita = this.createHasOneRepositoryFactoryFor('detallesVisita', detallesVisitaRepositoryGetter);
    this.registerInclusionResolver('detallesVisita', this.detallesVisita.inclusionResolver);
  }
}
