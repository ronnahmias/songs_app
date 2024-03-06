import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BandsModule } from './bands/bands.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      migrationsRun: true,
      migrations: ['dist/migration/*.js'],
      entities: ['dist/**/entities/*.entity.{js,ts}'],
      autoLoadEntities: true,
    }),
    SongsModule,
    BandsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
