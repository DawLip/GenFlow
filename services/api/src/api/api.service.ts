import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, Transport } from '@nestjs/microservices';
import type { ClientGrpc } from '@nestjs/microservices';
import { services_config } from '@libs/shared/src/lib/services_config';
import { AuthServiceClient } from '@proto/lib/auth.client';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ApiService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      protoPath: require.resolve('@proto/lib/auth.proto'),
      url: services_config.service_url.auth_rpc,
    },
  })
  private client:ClientGrpc;

  private authService:AuthServiceClient;

  onModuleInit():void {
    this.authService = this.client.getService<AuthServiceClient>('AuthService');
  }

  login(email:string, password:string) {
    return this.authService.login({ email, password });
  }

  register(username:string, email:string, password:string) {
    return this.authService.register({ username, email, password });
  }

  // Nowa metoda validate, która zwraca Promise<boolean>
  async validate(token: string): Promise<boolean> {
    try {
      // gRPC zwraca UserPayload przy poprawnej walidacji tokena
      const response = await firstValueFrom(this.authService.validate({ token }));
      return !!response?.id; // jeśli jest username, token jest OK
    } catch {
      return false;
    }
  }
}
