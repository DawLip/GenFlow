import { services_config } from "../services_config";

export const pinoConfig = ({sName}:{sName:string}) =>({
      pinoHttp: {
        level: 'trace',
        formatters: {
          level(label:string) { return { level: label }; },
        },
        transport: {
          target: 'pino-loki',
          level: 'trace',
          options: {
            colorize: true,
            host: services_config.service_url.loki, 
            labels: { service: `gf_${sName}` }, 
            interval: 5, 
            timeout: 3000
          },
        },
      },
    })