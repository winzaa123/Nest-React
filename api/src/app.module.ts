import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './configs/database.provider';

import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { InventoryModule } from './inventory/inventory.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule,
  ConfigModule.forRoot({
    validationSchema: Joi.object({
      POSTGRES_HOST: Joi.string().required(),
      POSTGRES_PORT: Joi.number().required(),
      POSTGRES_USER: Joi.string().required(),
      POSTGRES_PASSWORD: Joi.string().required(),
      POSTGRES_DB: Joi.string().required(),

      PORT: Joi.number(),
    })
  }),
  DatabaseModule,
  InventoryModule,
  UserModule,
  AuthModule
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
