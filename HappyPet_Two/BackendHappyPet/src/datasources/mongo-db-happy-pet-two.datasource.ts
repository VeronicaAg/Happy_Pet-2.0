import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'MongoDbHappyPetTwo',
  connector: 'mongodb',
  url: 'mongodb+srv://AmericanRocker:AmericanRocker1998@cluster0.j505h.mongodb.net/HappyPet_TwoBD?retryWrites=true&w=majority',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true,
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongoDbHappyPetTwoDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'MongoDbHappyPetTwo';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.MongoDbHappyPetTwo', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
