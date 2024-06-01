import { Logger } from '@nestjs/common';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { config } from 'dotenv';
// import migrations from '../database/migrations/index';

config();

export const dbConfig = (): MysqlConnectionOptions => {
  return {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT, 10) || 5432,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    entities: [],
    // We are using migrations, synchronize should be set to false.
    synchronize: true,
    // dropSchema: false,

    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    // migrationsRun: false,
    // logging: true,
    // migrations: migrations,
    // migrations: [join(__dirname, '../migrations/index.{ts,js}')],
  };
};

if (process.env.NODE_ENV === 'development') {
  Logger.debug(dbConfig());
}

export default dbConfig();
