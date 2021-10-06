import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './configs/database.provider';

import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { InventoryModule } from './inventory/inventory.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { TypeGraphQLModule } from 'typegraphql-nestjs';

@Module({
  imports: [
    ConfigModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),

        PORT: Joi.number(),
      }),
    }),
    DatabaseModule,
    InventoryModule,
    UserModule,
    AuthModule,
    TypeGraphQLModule.forRootAsync({
      inject: [],
      useFactory: async (config: ConfigService) => ({
        cors: true,
        // debug: config.isDevelopmentMode,
        // playground: !config.isDevelopmentMode,
        debug: true,
        playground: true,
        validate: false,
        dateScalarMode: "timestamp",
        emitSchemaFile: true,
        context: ({ req }) => ({ currentUser: req.user }),
        // emitSchemaFile:
        //   config.isDevelopmentMode && path.resolve(__dirname, "schema.gql"),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
