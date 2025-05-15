import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

function parsePort(port: string | undefined, fallback: number): number {
  if (!port) return fallback;
  const parsed = parseInt(port, 10);
  return isNaN(parsed) ? fallback : parsed;
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parsePort(process.env.DB_PORT, 5432),
      username: process.env.DB_USER || 'nestuser',
      password: process.env.DB_PASS || 'nestpass',
      database: process.env.DB_NAME || 'nestdb',
      autoLoadEntities: true,
      synchronize: true,
      ssl:
        process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    }),

    ServeStaticModule.forRoot({
      // rootPath: join(__dirname, '..', 'public'),
      rootPath: join(process.cwd(), 'public'),
    }),

    UserModule,

    AuthModule,
  ],
})
export class AppModule {
  constructor() {
    console.log(join(__dirname, '..', 'public'));
    console.log(__dirname);
  }
}
