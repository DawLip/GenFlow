import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, Transport } from '@nestjs/microservices';
import type { ClientGrpc } from '@nestjs/microservices';
import { join } from 'path';
import { HeroService } from '../../../../libs/proto/src/lib/hero.interface';
import { services_config } from '@libs/shared/src/lib/services_config';
  

@Injectable()
export class AppService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'hero',
      protoPath: join(__dirname, '../../../../libs/proto/src/lib/hero.proto'),
      url: services_config.service_url.auth_rpc,
    },
  })
  private client: ClientGrpc;

  private heroService: HeroService;

  onModuleInit() {
    this.heroService = this.client.getService<HeroService>('HeroService');
  }

  getHero(id: number) {
    return this.heroService.findOne({ id });
  }
}
