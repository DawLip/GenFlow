import { Module } from '@nestjs/common';
import { ProxyModule } from '@gateway/proxy/proxy.module';
import { HealthController } from '@gateway/app/health.controller';

@Module({
  imports: [ProxyModule],
  controllers: [HealthController],
})
export class AppModule {}
