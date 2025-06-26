import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController {
  @GrpcMethod('HeroService', 'FindOne')
  findOne(data: { id: number }) {
    return { id: data.id, name: 'HeroName' + data.id };
  }
}
