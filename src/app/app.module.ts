import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirstMiddleware } from 'src/middlewares/first.middleware';
import { logger } from 'src/middlewares/Logger.middleware';
import { TodoModule } from 'src/todo/todo.module';
import * as dotenv from 'dotenv';
import { CvModule } from 'src/cv/cv.module';
import { UserModule } from 'src/user/user.module';

dotenv.config();

@Module({
  imports: [
    TodoModule,
    CvModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_ADDON_HOST,
      port: parseInt(process.env.MYSQL_ADDON_PORT),
      username: process.env.MYSQL_ADDON_USER,
      password: process.env.MYSQL_ADDON_PASSWORD,
      database: process.env.MYSQL_ADDON_DB,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FirstMiddleware)
      .forRoutes(
        { path: 'todo', method: RequestMethod.GET },
        { path: 'todo*', method: RequestMethod.DELETE },
      )
      .apply(logger)
      .forRoutes('')
      .apply(HelmetMiddleware)
      .forRoutes('');
  }
}
