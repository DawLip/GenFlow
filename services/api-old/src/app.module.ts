import { join } from 'path';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core'; 
import { MongooseModule } from '@nestjs/mongoose';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLJSON } from 'graphql-type-json';

import { EventsGateway } from './socket/events.gateway';

import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

import { UsersModule } from './users/users.module';
import { UsersResolver } from './users/user.resolver';

import { AppController } from './app.controller';
import { FlowModule } from './flow/flow.module';
import { QueueModule } from './queue/queue.module';

import config from '../config';

@Module({
  imports: [
  AuthModule, 
    UsersModule, 
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      context: ({ req, res }) => ({ req, res })
    }), 
    MongooseModule.forRoot(config.mongo), 
    FlowModule, QueueModule,
  ],
  controllers: [AppController],
  
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    EventsGateway,

    UsersResolver,
    {
      provide: 'JSON',
      useValue: GraphQLJSON,
    },
  ],
})
export class AppModule {}
