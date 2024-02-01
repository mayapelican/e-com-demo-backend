import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from'./modules/auth/auth.module';
import { RolesGuard } from './common/guards/roles.guard';
import { AppLoggerMiddleware } from './common/utils/logger.middleware';
import { TenantMiddleware } from './common/middleware/tenant.middleware';
import { SecurityHeadersMiddleware } from './common/utils/security-headers.middleware';
import { ShoppingPreferenceModule } from './modules/shopping-preference/shopping-preference.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      autoLoadEntities: true,
      entities: [process.env.MYSQL_ENTITIES],
      synchronize: true,  // Set to false in production
      migrations: [process.env.MYSQL_MIGRATIONS],
    }),
    AuthModule,
    ShoppingPreferenceModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
    consumer.apply(TenantMiddleware).forRoutes('*');
    consumer.apply(SecurityHeadersMiddleware).forRoutes('*');
  }
}
