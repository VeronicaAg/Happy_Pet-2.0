import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbHappyPetTwoDataSource} from '../datasources';
import {DetallesVisita, DetallesVisitaRelations, Cliente, Visita} from '../models';
import {ClienteRepository} from './cliente.repository';
import {VisitaRepository} from './visita.repository';

export class DetallesVisitaRepository extends DefaultCrudRepository<
  DetallesVisita,
  typeof DetallesVisita.prototype.idDetallesVisita,
  DetallesVisitaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof DetallesVisita.prototype.idDetallesVisita>;

  public readonly visita: BelongsToAccessor<Visita, typeof DetallesVisita.prototype.idDetallesVisita>;

  constructor(
    @inject('datasources.MongoDbHappyPetTwo') dataSource: MongoDbHappyPetTwoDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('VisitaRepository') protected visitaRepositoryGetter: Getter<VisitaRepository>,
  ) {
    super(DetallesVisita, dataSource);
    this.visita = this.createBelongsToAccessorFor('visita', visitaRepositoryGetter,);
    this.registerInclusionResolver('visita', this.visita.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
