import { DataSource } from 'typeorm';
import { User } from './src/user/user.entity';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'nestuser',
  password: 'nestpass',
  database: 'nestdb',
  entities: [User],
  synchronize: true,
});
