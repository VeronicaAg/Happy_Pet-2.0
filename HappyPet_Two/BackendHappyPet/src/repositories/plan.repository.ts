import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbHappyPetTwoDataSource} from '../datasources';
import {Plan, PlanRelations} from '../models';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.idPlan,
  PlanRelations
> {
  constructor(
    @inject('datasources.MongoDbHappyPetTwo') dataSource: MongoDbHappyPetTwoDataSource,
  ) {
    super(Plan, dataSource);
  }
}
