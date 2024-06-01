import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { dbConfig } from './database';
import { config } from 'dotenv';

config();

interface iConfig {
  env: string;
  port: number;
  baseUrl: string;
  database: MysqlConnectionOptions;
  keys: {
    privateKey: string;
    publicKey: string;
  };
}

export default (): Partial<iConfig> => ({
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.APP_PORT, 10) || 3010,
  baseUrl: process.env.APP_BASE_URL || 'http://localhost',
  database: dbConfig(),
  keys: {
    privateKey: process.env.PRIVATE_KEY.replace(/\\n/gm, '\n'),
    publicKey: process.env.PUBLIC_KEY.replace(/\\n/gm, '\n'),
  },
});

