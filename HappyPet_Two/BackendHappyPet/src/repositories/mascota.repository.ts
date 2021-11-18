import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongoDbHappyPetTwoDataSource} from '../datasources';
import {Mascota, MascotaRelations, Cliente, Plan, PagoPlanes, Funcionario, Visita} from '../models';
import {ClienteRepository} from './cliente.repository';
import {PagoPlanesRepository} from './pago-planes.repository';
import {PlanRepository} from './plan.repository';
import {VisitaRepository} from './visita.repository';
import {FuncionarioRepository} from './funcionario.repository';

export class MascotaRepository extends DefaultCrudRepository<
  Mascota,
  typeof Mascota.prototype.idMascota,
  MascotaRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Mascota.prototype.idMascota>;

  public readonly plans: HasManyThroughRepositoryFactory<Plan, typeof Plan.prototype.idPlan,
          PagoPlanes,
          typeof Mascota.prototype.idMascota
        >;

  public readonly funcionarios: HasManyThroughRepositoryFactory<Funcionario, typeof Funcionario.prototype.idFuncionario,
          Visita,
          typeof Mascota.prototype.idMascota
        >;

  constructor(
    @inject('datasources.MongoDbHappyPetTwo') dataSource: MongoDbHappyPetTwoDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('PagoPlanesRepository') protected pagoPlanesRepositoryGetter: Getter<PagoPlanesRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('VisitaRepository') protected visitaRepositoryGetter: Getter<VisitaRepository>, @repository.getter('FuncionarioRepository') protected funcionarioRepositoryGetter: Getter<FuncionarioRepository>,
  ) {
    super(Mascota, dataSource);
    this.funcionarios = this.createHasManyThroughRepositoryFactoryFor('funcionarios', funcionarioRepositoryGetter, visitaRepositoryGetter,);
    this.registerInclusionResolver('funcionarios', this.funcionarios.inclusionResolver);
    this.plans = this.createHasManyThroughRepositoryFactoryFor('plans', planRepositoryGetter, pagoPlanesRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
