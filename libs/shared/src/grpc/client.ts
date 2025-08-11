import { GrpcOptions, Transport } from '@nestjs/microservices';
import { services_config } from '../services_config';

type serviceNameType = 'auth' | 'user' | 'project' | 'team' | 'genworker';

export function gRPC_client(serviceName: serviceNameType): GrpcOptions {
  const url = services_config.service_url[`${serviceName}_rpc`];
  if (!url) throw new Error(`Service URL for ${serviceName} not found in services_config`);

  return {
    transport: Transport.GRPC,
    options: {
      package: serviceName,
      protoPath: require.resolve(`@proto/${serviceName}/${serviceName}.proto`),
      url: url,
    }
  };
}