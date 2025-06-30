import { configDotenv } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './user/entity/user.entity';

configDotenv();

export const dataSourceOptions = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User],
  synchronize: true,
  logging: true,
} as DataSourceOptions;

export const dataSource = new DataSource(dataSourceOptions);
