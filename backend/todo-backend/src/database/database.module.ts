import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'mysql'>('DATABASE_TYPE') || 'mysql',
        host: configService.get<string>('DATABASE_HOST') || 'localhost',
        port: configService.get<number>('DATABASE_PORT') || 3306,
        username: configService.get<string>('DATABASE_USERNAME') || '',
        password: configService.get<string>('DATABASE_PASSWORD') || '',
        database: configService.get<string>('DATABASE_NAME') || '',
        entities: [],
        synchronize: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
