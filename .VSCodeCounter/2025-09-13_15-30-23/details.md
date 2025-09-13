# Details

Date : 2025-09-13 15:30:23

Directory /home/david/workspace/GenFlow

Total : 374 files,  44189 codes, 113 comments, 2632 blanks, all 46934 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [.prettierignore](/.prettierignore) | Ignore | 4 | 1 | 0 | 5 |
| [.prettierrc](/.prettierrc) | JSON | 3 | 0 | 1 | 4 |
| [README.md](/README.md) | Markdown | 68 | 0 | 42 | 110 |
| [compose/api-test.yml](/compose/api-test.yml) | YAML | 13 | 0 | 0 | 13 |
| [compose/api.yml](/compose/api.yml) | YAML | 13 | 0 | 0 | 13 |
| [compose/auth.yml](/compose/auth.yml) | YAML | 13 | 0 | 0 | 13 |
| [compose/email.yml](/compose/email.yml) | YAML | 13 | 0 | 0 | 13 |
| [compose/gateway.yml](/compose/gateway.yml) | YAML | 15 | 0 | 0 | 15 |
| [compose/genworker.yml](/compose/genworker.yml) | YAML | 13 | 0 | 0 | 13 |
| [compose/graphql.yml](/compose/graphql.yml) | YAML | 13 | 0 | 0 | 13 |
| [compose/infra/mongodb.yml](/compose/infra/mongodb.yml) | YAML | 9 | 0 | 0 | 9 |
| [compose/infra/rabbitmq.yml](/compose/infra/rabbitmq.yml) | YAML | 13 | 0 | 0 | 13 |
| [compose/infra/redis-commander.yml](/compose/infra/redis-commander.yml) | YAML | 12 | 0 | 0 | 12 |
| [compose/infra/redis.yml](/compose/infra/redis.yml) | YAML | 13 | 0 | 1 | 14 |
| [compose/logs/datasources/loki.yml](/compose/logs/datasources/loki.yml) | YAML | 8 | 0 | 3 | 11 |
| [compose/logs/grafana.yml](/compose/logs/grafana.yml) | YAML | 11 | 0 | 1 | 12 |
| [compose/logs/loki-config.yaml](/compose/logs/loki-config.yaml) | YAML | 34 | 0 | 7 | 41 |
| [compose/logs/loki.yml](/compose/logs/loki.yml) | YAML | 12 | 0 | 0 | 12 |
| [compose/logs/promtail-config.yaml](/compose/logs/promtail-config.yaml) | YAML | 29 | 0 | 5 | 34 |
| [compose/logs/promtail.yml](/compose/logs/promtail.yml) | YAML | 10 | 0 | 0 | 10 |
| [compose/project.yml](/compose/project.yml) | YAML | 13 | 0 | 0 | 13 |
| [compose/socketio.yml](/compose/socketio.yml) | YAML | 13 | 0 | 0 | 13 |
| [compose/team.yml](/compose/team.yml) | YAML | 13 | 0 | 0 | 13 |
| [compose/user.yml](/compose/user.yml) | YAML | 13 | 0 | 0 | 13 |
| [compose/web-ui.yml](/compose/web-ui.yml) | YAML | 13 | 0 | 0 | 13 |
| [docker-compose.yml](/docker-compose.yml) | YAML | 157 | 4 | 12 | 173 |
| [libs/proto/README.md](/libs/proto/README.md) | Markdown | 2 | 0 | 2 | 4 |
| [libs/proto/project.json](/libs/proto/project.json) | JSON | 9 | 0 | 1 | 10 |
| [libs/proto/src/auth/auth.client.ts](/libs/proto/src/auth/auth.client.ts) | TypeScript | 9 | 0 | 2 | 11 |
| [libs/proto/src/auth/auth.proto](/libs/proto/src/auth/auth.proto) | Protocol Buffers | 47 | 0 | 10 | 57 |
| [libs/proto/src/auth/auth.ts](/libs/proto/src/auth/auth.ts) | TypeScript | 697 | 6 | 95 | 798 |
| [libs/proto/src/genworker/genworker.client.ts](/libs/proto/src/genworker/genworker.client.ts) | TypeScript | 17 | 2 | 5 | 24 |
| [libs/proto/src/genworker/genworker.proto](/libs/proto/src/genworker/genworker.proto) | Protocol Buffers | 135 | 0 | 14 | 149 |
| [libs/proto/src/genworker/genworker.ts](/libs/proto/src/genworker/genworker.ts) | TypeScript | 1,995 | 9 | 234 | 2,238 |
| [libs/proto/src/project/project.client.ts](/libs/proto/src/project/project.client.ts) | TypeScript | 24 | 0 | 3 | 27 |
| [libs/proto/src/project/project.proto](/libs/proto/src/project/project.proto) | Protocol Buffers | 125 | 0 | 19 | 144 |
| [libs/proto/src/project/project.ts](/libs/proto/src/project/project.ts) | TypeScript | 1,989 | 6 | 234 | 2,229 |
| [libs/proto/src/socketio/socketio.client.ts](/libs/proto/src/socketio/socketio.client.ts) | TypeScript | 6 | 0 | 1 | 7 |
| [libs/proto/src/socketio/socketio.proto](/libs/proto/src/socketio/socketio.proto) | Protocol Buffers | 23 | 0 | 6 | 29 |
| [libs/proto/src/socketio/socketio.ts](/libs/proto/src/socketio/socketio.ts) | TypeScript | 321 | 6 | 44 | 371 |
| [libs/proto/src/team/team.client.ts](/libs/proto/src/team/team.client.ts) | TypeScript | 10 | 0 | 1 | 11 |
| [libs/proto/src/team/team.proto](/libs/proto/src/team/team.proto) | Protocol Buffers | 67 | 0 | 12 | 79 |
| [libs/proto/src/team/team.ts](/libs/proto/src/team/team.ts) | TypeScript | 1,033 | 6 | 134 | 1,173 |
| [libs/proto/src/user/user.client.ts](/libs/proto/src/user/user.client.ts) | TypeScript | 9 | 0 | 2 | 11 |
| [libs/proto/src/user/user.proto](/libs/proto/src/user/user.proto) | Protocol Buffers | 81 | 0 | 14 | 95 |
| [libs/proto/src/user/user.ts](/libs/proto/src/user/user.ts) | TypeScript | 1,299 | 6 | 149 | 1,454 |
| [libs/proto/tsconfig.json](/libs/proto/tsconfig.json) | JSON with Comments | 13 | 0 | 1 | 14 |
| [libs/proto/tsconfig.lib.json](/libs/proto/tsconfig.lib.json) | JSON | 9 | 0 | 1 | 10 |
| [libs/shared/README.md](/libs/shared/README.md) | Markdown | 2 | 0 | 2 | 4 |
| [libs/shared/project.json](/libs/shared/project.json) | JSON | 9 | 0 | 1 | 10 |
| [libs/shared/src/config/gRPC\_client.config.ts](/libs/shared/src/config/gRPC_client.config.ts) | TypeScript | 15 | 0 | 3 | 18 |
| [libs/shared/src/config/pino.config.ts](/libs/shared/src/config/pino.config.ts) | TypeScript | 20 | 0 | 1 | 21 |
| [libs/shared/src/default-exception.filter.ts](/libs/shared/src/default-exception.filter.ts) | TypeScript | 68 | 1 | 10 | 79 |
| [libs/shared/src/grpc-exception.filter.ts](/libs/shared/src/grpc-exception.filter.ts) | TypeScript | 18 | 0 | 3 | 21 |
| [libs/shared/src/index.ts](/libs/shared/src/index.ts) | TypeScript | 1 | 0 | 1 | 2 |
| [libs/shared/src/schema/genworker.schema.ts](/libs/shared/src/schema/genworker.schema.ts) | TypeScript | 17 | 0 | 8 | 25 |
| [libs/shared/src/schema/project.shema.ts](/libs/shared/src/schema/project.shema.ts) | TypeScript | 65 | 0 | 26 | 91 |
| [libs/shared/src/schema/task.shema.ts](/libs/shared/src/schema/task.shema.ts) | TypeScript | 17 | 0 | 8 | 25 |
| [libs/shared/src/schema/team.shema.ts](/libs/shared/src/schema/team.shema.ts) | TypeScript | 15 | 0 | 7 | 22 |
| [libs/shared/src/schema/user.shema.ts](/libs/shared/src/schema/user.shema.ts) | TypeScript | 19 | 0 | 8 | 27 |
| [libs/shared/src/service\_name.ts](/libs/shared/src/service_name.ts) | TypeScript | 3 | 0 | 0 | 3 |
| [libs/shared/src/services\_config.ts](/libs/shared/src/services_config.ts) | TypeScript | 25 | 0 | 10 | 35 |
| [libs/shared/src/sharedServices/health.controller.ts](/libs/shared/src/sharedServices/health.controller.ts) | TypeScript | 16 | 0 | 4 | 20 |
| [libs/shared/src/sharedServices/response.service.ts](/libs/shared/src/sharedServices/response.service.ts) | TypeScript | 36 | 0 | 7 | 43 |
| [libs/shared/src/types/GenWorker.type.ts](/libs/shared/src/types/GenWorker.type.ts) | TypeScript | 8 | 0 | 1 | 9 |
| [libs/shared/src/types/Project.type.ts](/libs/shared/src/types/Project.type.ts) | TypeScript | 35 | 0 | 5 | 40 |
| [libs/shared/src/types/Task.type.ts](/libs/shared/src/types/Task.type.ts) | TypeScript | 9 | 0 | 2 | 11 |
| [libs/shared/src/types/Team.type.ts](/libs/shared/src/types/Team.type.ts) | TypeScript | 8 | 0 | 2 | 10 |
| [libs/shared/src/types/User.type.ts](/libs/shared/src/types/User.type.ts) | TypeScript | 10 | 0 | 2 | 12 |
| [libs/shared/tsconfig.json](/libs/shared/tsconfig.json) | JSON with Comments | 10 | 0 | 1 | 11 |
| [libs/shared/tsconfig.lib.json](/libs/shared/tsconfig.lib.json) | JSON | 14 | 0 | 1 | 15 |
| [nx.json](/nx.json) | JSON | 62 | 0 | 1 | 63 |
| [package-lock.json](/package-lock.json) | JSON | 27,197 | 0 | 1 | 27,198 |
| [package.json](/package.json) | JSON | 120 | 0 | 1 | 121 |
| [services/api-test/package.json](/services/api-test/package.json) | JSON | 45 | 0 | 1 | 46 |
| [services/api-test/project.json](/services/api-test/project.json) | JSON | 10 | 0 | 1 | 11 |
| [services/api-test/src/api/api.module.ts](/services/api-test/src/api/api.module.ts) | TypeScript | 44 | 5 | 7 | 56 |
| [services/api-test/src/api/api.service.ts](/services/api-test/src/api/api.service.ts) | TypeScript | 47 | 0 | 8 | 55 |
| [services/api-test/src/api/health.controller.ts](/services/api-test/src/api/health.controller.ts) | TypeScript | 15 | 0 | 4 | 19 |
| [services/api-test/src/auth/auth.controller.ts](/services/api-test/src/auth/auth.controller.ts) | TypeScript | 18 | 0 | 3 | 21 |
| [services/api-test/src/auth/auth.module.ts](/services/api-test/src/auth/auth.module.ts) | TypeScript | 10 | 0 | 1 | 11 |
| [services/api-test/src/auth/auth.service.ts](/services/api-test/src/auth/auth.service.ts) | TypeScript | 38 | 0 | 10 | 48 |
| [services/api-test/src/email/email.controller.ts](/services/api-test/src/email/email.controller.ts) | TypeScript | 12 | 0 | 3 | 15 |
| [services/api-test/src/email/email.module.ts](/services/api-test/src/email/email.module.ts) | TypeScript | 11 | 0 | 1 | 12 |
| [services/api-test/src/email/email.provider.ts](/services/api-test/src/email/email.provider.ts) | TypeScript | 15 | 0 | 2 | 17 |
| [services/api-test/src/email/email.service.ts](/services/api-test/src/email/email.service.ts) | TypeScript | 20 | 0 | 5 | 25 |
| [services/api-test/src/guards/auth.guard.ts](/services/api-test/src/guards/auth.guard.ts) | TypeScript | 46 | 0 | 8 | 54 |
| [services/api-test/src/guards/auth.public.ts](/services/api-test/src/guards/auth.public.ts) | TypeScript | 3 | 0 | 1 | 4 |
| [services/api-test/src/main.ts](/services/api-test/src/main.ts) | TypeScript | 19 | 0 | 10 | 29 |
| [services/api-test/src/project/project.controller.ts](/services/api-test/src/project/project.controller.ts) | TypeScript | 28 | 0 | 7 | 35 |
| [services/api-test/src/project/project.module.ts](/services/api-test/src/project/project.module.ts) | TypeScript | 10 | 0 | 1 | 11 |
| [services/api-test/src/project/project.service.ts](/services/api-test/src/project/project.service.ts) | TypeScript | 54 | 0 | 18 | 72 |
| [services/api-test/src/socketio/socketio.controller.ts](/services/api-test/src/socketio/socketio.controller.ts) | TypeScript | 12 | 0 | 3 | 15 |
| [services/api-test/src/socketio/socketio.module.ts](/services/api-test/src/socketio/socketio.module.ts) | TypeScript | 11 | 0 | 1 | 12 |
| [services/api-test/src/socketio/socketio.provider.ts](/services/api-test/src/socketio/socketio.provider.ts) | TypeScript | 15 | 0 | 2 | 17 |
| [services/api-test/src/socketio/socketio.service.ts](/services/api-test/src/socketio/socketio.service.ts) | TypeScript | 19 | 0 | 5 | 24 |
| [services/api-test/src/team/team.controller.ts](/services/api-test/src/team/team.controller.ts) | TypeScript | 28 | 0 | 7 | 35 |
| [services/api-test/src/team/team.module.ts](/services/api-test/src/team/team.module.ts) | TypeScript | 10 | 0 | 1 | 11 |
| [services/api-test/src/team/team.service.ts](/services/api-test/src/team/team.service.ts) | TypeScript | 45 | 0 | 16 | 61 |
| [services/api-test/src/types/authenticated-request.ts](/services/api-test/src/types/authenticated-request.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [services/api-test/src/user/user.controller.ts](/services/api-test/src/user/user.controller.ts) | TypeScript | 16 | 0 | 5 | 21 |
| [services/api-test/src/user/user.module.ts](/services/api-test/src/user/user.module.ts) | TypeScript | 10 | 0 | 1 | 11 |
| [services/api-test/src/user/user.service.ts](/services/api-test/src/user/user.service.ts) | TypeScript | 40 | 0 | 14 | 54 |
| [services/api-test/tsconfig.app.json](/services/api-test/tsconfig.app.json) | JSON | 13 | 1 | 1 | 15 |
| [services/api-test/tsconfig.json](/services/api-test/tsconfig.json) | JSON with Comments | 34 | 0 | 1 | 35 |
| [services/api/package.json](/services/api/package.json) | JSON | 45 | 0 | 1 | 46 |
| [services/api/project.json](/services/api/project.json) | JSON | 10 | 0 | 1 | 11 |
| [services/api/src/api/api.module.ts](/services/api/src/api/api.module.ts) | TypeScript | 42 | 0 | 7 | 49 |
| [services/api/src/api/api.service.ts](/services/api/src/api/api.service.ts) | TypeScript | 37 | 0 | 6 | 43 |
| [services/api/src/auth/auth.controller.ts](/services/api/src/auth/auth.controller.ts) | TypeScript | 27 | 0 | 5 | 32 |
| [services/api/src/auth/auth.module.ts](/services/api/src/auth/auth.module.ts) | TypeScript | 11 | 0 | 1 | 12 |
| [services/api/src/auth/auth.service.ts](/services/api/src/auth/auth.service.ts) | TypeScript | 44 | 0 | 13 | 57 |
| [services/api/src/email/email.controller.ts](/services/api/src/email/email.controller.ts) | TypeScript | 12 | 0 | 3 | 15 |
| [services/api/src/email/email.module.ts](/services/api/src/email/email.module.ts) | TypeScript | 12 | 0 | 1 | 13 |
| [services/api/src/email/email.provider.ts](/services/api/src/email/email.provider.ts) | TypeScript | 15 | 0 | 2 | 17 |
| [services/api/src/email/email.service.ts](/services/api/src/email/email.service.ts) | TypeScript | 22 | 0 | 5 | 27 |
| [services/api/src/genworker/genworker.controller.ts](/services/api/src/genworker/genworker.controller.ts) | TypeScript | 44 | 0 | 9 | 53 |
| [services/api/src/genworker/genworker.module.ts](/services/api/src/genworker/genworker.module.ts) | TypeScript | 11 | 0 | 1 | 12 |
| [services/api/src/genworker/genworker.service.ts](/services/api/src/genworker/genworker.service.ts) | TypeScript | 80 | 0 | 31 | 111 |
| [services/api/src/guards/auth.guard.ts](/services/api/src/guards/auth.guard.ts) | TypeScript | 46 | 0 | 8 | 54 |
| [services/api/src/guards/auth.public.ts](/services/api/src/guards/auth.public.ts) | TypeScript | 3 | 0 | 1 | 4 |
| [services/api/src/main.ts](/services/api/src/main.ts) | TypeScript | 19 | 0 | 10 | 29 |
| [services/api/src/project/project.controller.ts](/services/api/src/project/project.controller.ts) | TypeScript | 42 | 1 | 11 | 54 |
| [services/api/src/project/project.module.ts](/services/api/src/project/project.module.ts) | TypeScript | 11 | 0 | 1 | 12 |
| [services/api/src/project/project.service.ts](/services/api/src/project/project.service.ts) | TypeScript | 51 | 0 | 21 | 72 |
| [services/api/src/socketio/socketio.controller.ts](/services/api/src/socketio/socketio.controller.ts) | TypeScript | 12 | 0 | 3 | 15 |
| [services/api/src/socketio/socketio.module.ts](/services/api/src/socketio/socketio.module.ts) | TypeScript | 12 | 0 | 1 | 13 |
| [services/api/src/socketio/socketio.provider.ts](/services/api/src/socketio/socketio.provider.ts) | TypeScript | 15 | 0 | 2 | 17 |
| [services/api/src/socketio/socketio.service.ts](/services/api/src/socketio/socketio.service.ts) | TypeScript | 21 | 0 | 5 | 26 |
| [services/api/src/team/team.controller.ts](/services/api/src/team/team.controller.ts) | TypeScript | 28 | 0 | 8 | 36 |
| [services/api/src/team/team.module.ts](/services/api/src/team/team.module.ts) | TypeScript | 11 | 0 | 1 | 12 |
| [services/api/src/team/team.service.ts](/services/api/src/team/team.service.ts) | TypeScript | 43 | 0 | 16 | 59 |
| [services/api/src/types/authenticated-request.ts](/services/api/src/types/authenticated-request.ts) | TypeScript | 4 | 0 | 2 | 6 |
| [services/api/src/user/user.controller.ts](/services/api/src/user/user.controller.ts) | TypeScript | 16 | 0 | 5 | 21 |
| [services/api/src/user/user.module.ts](/services/api/src/user/user.module.ts) | TypeScript | 11 | 0 | 1 | 12 |
| [services/api/src/user/user.service.ts](/services/api/src/user/user.service.ts) | TypeScript | 38 | 0 | 12 | 50 |
| [services/api/tsconfig.app.json](/services/api/tsconfig.app.json) | JSON | 13 | 1 | 1 | 15 |
| [services/api/tsconfig.json](/services/api/tsconfig.json) | JSON with Comments | 34 | 0 | 1 | 35 |
| [services/auth/package.json](/services/auth/package.json) | JSON | 45 | 0 | 1 | 46 |
| [services/auth/project.json](/services/auth/project.json) | JSON | 10 | 0 | 1 | 11 |
| [services/auth/src/auth/auth.controller.ts](/services/auth/src/auth/auth.controller.ts) | TypeScript | 38 | 0 | 7 | 45 |
| [services/auth/src/auth/auth.module.ts](/services/auth/src/auth/auth.module.ts) | TypeScript | 21 | 0 | 5 | 26 |
| [services/auth/src/auth/auth.service.ts](/services/auth/src/auth/auth.service.ts) | TypeScript | 121 | 0 | 30 | 151 |
| [services/auth/src/auth/email.provider.ts](/services/auth/src/auth/email.provider.ts) | TypeScript | 15 | 0 | 2 | 17 |
| [services/auth/src/main.ts](/services/auth/src/main.ts) | TypeScript | 27 | 0 | 8 | 35 |
| [services/auth/tsconfig.app.json](/services/auth/tsconfig.app.json) | JSON | 13 | 1 | 1 | 15 |
| [services/auth/tsconfig.json](/services/auth/tsconfig.json) | JSON with Comments | 33 | 0 | 1 | 34 |
| [services/email/package.json](/services/email/package.json) | JSON | 45 | 0 | 1 | 46 |
| [services/email/project.json](/services/email/project.json) | JSON | 10 | 0 | 1 | 11 |
| [services/email/src/email/custom.provider.ts](/services/email/src/email/custom.provider.ts) | TypeScript | 7 | 0 | 1 | 8 |
| [services/email/src/email/email.consumer.ts](/services/email/src/email/email.consumer.ts) | TypeScript | 18 | 0 | 4 | 22 |
| [services/email/src/email/email.module.ts](/services/email/src/email/email.module.ts) | TypeScript | 19 | 0 | 5 | 24 |
| [services/email/src/email/email.service.ts](/services/email/src/email/email.service.ts) | TypeScript | 14 | 0 | 7 | 21 |
| [services/email/src/main.ts](/services/email/src/main.ts) | TypeScript | 27 | 0 | 6 | 33 |
| [services/email/tsconfig.app.json](/services/email/tsconfig.app.json) | JSON | 13 | 1 | 1 | 15 |
| [services/email/tsconfig.json](/services/email/tsconfig.json) | JSON with Comments | 33 | 0 | 1 | 34 |
| [services/gateway/package.json](/services/gateway/package.json) | JSON | 45 | 0 | 1 | 46 |
| [services/gateway/project.json](/services/gateway/project.json) | JSON | 10 | 0 | 1 | 11 |
| [services/gateway/src/app/app.module.ts](/services/gateway/src/app/app.module.ts) | TypeScript | 18 | 0 | 5 | 23 |
| [services/gateway/src/main.ts](/services/gateway/src/main.ts) | TypeScript | 23 | 0 | 10 | 33 |
| [services/gateway/src/proxy/proxy.module.ts](/services/gateway/src/proxy/proxy.module.ts) | TypeScript | 47 | 0 | 4 | 51 |
| [services/gateway/tsconfig.app.json](/services/gateway/tsconfig.app.json) | JSON | 13 | 1 | 1 | 15 |
| [services/gateway/tsconfig.json](/services/gateway/tsconfig.json) | JSON with Comments | 33 | 0 | 1 | 34 |
| [services/genworker-app/project.json](/services/genworker-app/project.json) | JSON | 19 | 0 | 1 | 20 |
| [services/genworker-app/src/adapters/gateways/AuthGateway.py](/services/genworker-app/src/adapters/gateways/AuthGateway.py) | Python | 9 | 0 | 2 | 11 |
| [services/genworker-app/src/adapters/gateways/PackagesGateway.py](/services/genworker-app/src/adapters/gateways/PackagesGateway.py) | Python | 10 | 0 | 4 | 14 |
| [services/genworker-app/src/adapters/gateways/TaskSchedulerGateway.py](/services/genworker-app/src/adapters/gateways/TaskSchedulerGateway.py) | Python | 29 | 0 | 7 | 36 |
| [services/genworker-app/src/adapters/repos/AuthRepo.py](/services/genworker-app/src/adapters/repos/AuthRepo.py) | Python | 20 | 0 | 8 | 28 |
| [services/genworker-app/src/adapters/repos/FilesRepo.py](/services/genworker-app/src/adapters/repos/FilesRepo.py) | Python | 11 | 0 | 5 | 16 |
| [services/genworker-app/src/adapters/repos/NodeRepo.py](/services/genworker-app/src/adapters/repos/NodeRepo.py) | Python | 19 | 0 | 12 | 31 |
| [services/genworker-app/src/adapters/repos/TaskRepo.py](/services/genworker-app/src/adapters/repos/TaskRepo.py) | Python | 10 | 0 | 7 | 17 |
| [services/genworker-app/src/dispatch.py](/services/genworker-app/src/dispatch.py) | Python | 6 | 0 | 2 | 8 |
| [services/genworker-app/src/domain/Auth.py](/services/genworker-app/src/domain/Auth.py) | Python | 43 | 0 | 12 | 55 |
| [services/genworker-app/src/domain/CpuWorker.py](/services/genworker-app/src/domain/CpuWorker.py) | Python | 17 | 1 | 8 | 26 |
| [services/genworker-app/src/domain/Domain.py](/services/genworker-app/src/domain/Domain.py) | Python | 27 | 0 | 10 | 37 |
| [services/genworker-app/src/domain/FileSystem.py](/services/genworker-app/src/domain/FileSystem.py) | Python | 12 | 0 | 5 | 17 |
| [services/genworker-app/src/domain/Node.py](/services/genworker-app/src/domain/Node.py) | Python | 22 | 0 | 10 | 32 |
| [services/genworker-app/src/domain/Packages.py](/services/genworker-app/src/domain/Packages.py) | Python | 26 | 0 | 12 | 38 |
| [services/genworker-app/src/domain/TaskScheduler.py](/services/genworker-app/src/domain/TaskScheduler.py) | Python | 66 | 1 | 20 | 87 |
| [services/genworker-app/src/event\_queue.py](/services/genworker-app/src/event_queue.py) | Python | 2 | 0 | 2 | 4 |
| [services/genworker-app/src/main.py](/services/genworker-app/src/main.py) | Python | 14 | 0 | 8 | 22 |
| [services/genworker-app/src/sio/SIO.py](/services/genworker-app/src/sio/SIO.py) | Python | 52 | 0 | 12 | 64 |
| [services/genworker-app/src/ui/UI.py](/services/genworker-app/src/ui/UI.py) | Python | 9 | 0 | 1 | 10 |
| [services/genworker-app/src/ui/console/DashboardScreen.py](/services/genworker-app/src/ui/console/DashboardScreen.py) | Python | 8 | 0 | 2 | 10 |
| [services/genworker-app/src/ui/console/LoginScreen.py](/services/genworker-app/src/ui/console/LoginScreen.py) | Python | 14 | 0 | 5 | 19 |
| [services/genworker-app/src/ui/console/consoleUI.py](/services/genworker-app/src/ui/console/consoleUI.py) | Python | 21 | 0 | 7 | 28 |
| [services/genworker-app/workspace/auth.json](/services/genworker-app/workspace/auth.json) | JSON | 1 | 0 | 0 | 1 |
| [services/genworker-app/workspace/packages/Diffusers/Unified/Base/Txt2ImgUnified/Txt2ImgUnified.json](/services/genworker-app/workspace/packages/Diffusers/Unified/Base/Txt2ImgUnified/Txt2ImgUnified.json) | JSON | 91 | 0 | 1 | 92 |
| [services/genworker-app/workspace/packages/Diffusers/Unified/Base/Txt2ImgUnified/Txt2ImgUnified.py](/services/genworker-app/workspace/packages/Diffusers/Unified/Base/Txt2ImgUnified/Txt2ImgUnified.py) | Python | 37 | 0 | 9 | 46 |
| [services/genworker-app/workspace/packages/Diffusers/config.json](/services/genworker-app/workspace/packages/Diffusers/config.json) | JSON | 8 | 0 | 0 | 8 |
| [services/genworker-app/workspace/packages/GenFlow/File/Save/TextFileSave/TextFileSave.json](/services/genworker-app/workspace/packages/GenFlow/File/Save/TextFileSave/TextFileSave.json) | JSON | 19 | 0 | 1 | 20 |
| [services/genworker-app/workspace/packages/GenFlow/File/Save/TextFileSave/TextFileSave.py](/services/genworker-app/workspace/packages/GenFlow/File/Save/TextFileSave/TextFileSave.py) | Python | 15 | 0 | 2 | 17 |
| [services/genworker-app/workspace/packages/GenFlow/Image/Base/ImageSave/ImageSave.json](/services/genworker-app/workspace/packages/GenFlow/Image/Base/ImageSave/ImageSave.json) | JSON | 19 | 0 | 1 | 20 |
| [services/genworker-app/workspace/packages/GenFlow/Image/Base/ImageSave/ImageSave.py](/services/genworker-app/workspace/packages/GenFlow/Image/Base/ImageSave/ImageSave.py) | Python | 23 | 0 | 6 | 29 |
| [services/genworker-app/workspace/packages/GenFlow/Number/Base/NumberInput/NumberInput.json](/services/genworker-app/workspace/packages/GenFlow/Number/Base/NumberInput/NumberInput.json) | JSON | 28 | 0 | 1 | 29 |
| [services/genworker-app/workspace/packages/GenFlow/Number/Base/NumberInput/NumberInput.py](/services/genworker-app/workspace/packages/GenFlow/Number/Base/NumberInput/NumberInput.py) | Python | 6 | 0 | 0 | 6 |
| [services/genworker-app/workspace/packages/GenFlow/Text/Base/TextInput/TextInput.json](/services/genworker-app/workspace/packages/GenFlow/Text/Base/TextInput/TextInput.json) | JSON | 28 | 0 | 1 | 29 |
| [services/genworker-app/workspace/packages/GenFlow/Text/Base/TextInput/TextInput.py](/services/genworker-app/workspace/packages/GenFlow/Text/Base/TextInput/TextInput.py) | Python | 6 | 0 | 0 | 6 |
| [services/genworker-app/workspace/packages/GenFlow/Text/Operations/TextConcat/TextConcat.json](/services/genworker-app/workspace/packages/GenFlow/Text/Operations/TextConcat/TextConcat.json) | JSON | 35 | 0 | 1 | 36 |
| [services/genworker-app/workspace/packages/GenFlow/Text/Operations/TextConcat/TextConcat.py](/services/genworker-app/workspace/packages/GenFlow/Text/Operations/TextConcat/TextConcat.py) | Python | 6 | 0 | 1 | 7 |
| [services/genworker-app/workspace/packages/GenFlow/config.json](/services/genworker-app/workspace/packages/GenFlow/config.json) | JSON | 12 | 0 | 0 | 12 |
| [services/genworker/package.json](/services/genworker/package.json) | JSON | 45 | 0 | 1 | 46 |
| [services/genworker/project.json](/services/genworker/project.json) | JSON | 12 | 0 | 1 | 13 |
| [services/genworker/src/genworker/genworker.controller.ts](/services/genworker/src/genworker/genworker.controller.ts) | TypeScript | 72 | 0 | 16 | 88 |
| [services/genworker/src/genworker/genworker.module.ts](/services/genworker/src/genworker/genworker.module.ts) | TypeScript | 35 | 0 | 8 | 43 |
| [services/genworker/src/genworker/services/genworker.service.ts](/services/genworker/src/genworker/services/genworker.service.ts) | TypeScript | 103 | 0 | 27 | 130 |
| [services/genworker/src/genworker/services/task.service.ts](/services/genworker/src/genworker/services/task.service.ts) | TypeScript | 74 | 0 | 12 | 86 |
| [services/genworker/src/genworker/services/task\_queue.service.ts](/services/genworker/src/genworker/services/task_queue.service.ts) | TypeScript | 157 | 7 | 60 | 224 |
| [services/genworker/src/main.ts](/services/genworker/src/main.ts) | TypeScript | 28 | 0 | 5 | 33 |
| [services/genworker/tsconfig.app.json](/services/genworker/tsconfig.app.json) | JSON | 13 | 1 | 1 | 15 |
| [services/genworker/tsconfig.json](/services/genworker/tsconfig.json) | JSON with Comments | 34 | 0 | 1 | 35 |
| [services/graphql/package.json](/services/graphql/package.json) | JSON | 45 | 0 | 1 | 46 |
| [services/graphql/project.json](/services/graphql/project.json) | JSON | 10 | 0 | 1 | 11 |
| [services/graphql/src/app/app.module.ts](/services/graphql/src/app/app.module.ts) | TypeScript | 16 | 0 | 4 | 20 |
| [services/graphql/src/main.ts](/services/graphql/src/main.ts) | TypeScript | 15 | 0 | 7 | 22 |
| [services/graphql/tsconfig.app.json](/services/graphql/tsconfig.app.json) | JSON | 13 | 1 | 1 | 15 |
| [services/graphql/tsconfig.json](/services/graphql/tsconfig.json) | JSON with Comments | 33 | 0 | 1 | 34 |
| [services/project/package.json](/services/project/package.json) | JSON | 45 | 0 | 1 | 46 |
| [services/project/project.json](/services/project/project.json) | JSON | 10 | 0 | 1 | 11 |
| [services/project/src/main.ts](/services/project/src/main.ts) | TypeScript | 37 | 0 | 8 | 45 |
| [services/project/src/project/project.controller.ts](/services/project/src/project/project.controller.ts) | TypeScript | 56 | 0 | 11 | 67 |
| [services/project/src/project/project.module.ts](/services/project/src/project/project.module.ts) | TypeScript | 24 | 0 | 6 | 30 |
| [services/project/src/project/project.service.ts](/services/project/src/project/project.service.ts) | TypeScript | 159 | 0 | 43 | 202 |
| [services/project/tsconfig.app.json](/services/project/tsconfig.app.json) | JSON | 13 | 1 | 1 | 15 |
| [services/project/tsconfig.json](/services/project/tsconfig.json) | JSON with Comments | 33 | 0 | 1 | 34 |
| [services/socket.io/package.json](/services/socket.io/package.json) | JSON | 45 | 0 | 1 | 46 |
| [services/socket.io/project.json](/services/socket.io/project.json) | JSON | 10 | 0 | 1 | 11 |
| [services/socket.io/src/app/app.module.ts](/services/socket.io/src/app/app.module.ts) | TypeScript | 21 | 0 | 4 | 25 |
| [services/socket.io/src/app/notifications.gateway.ts](/services/socket.io/src/app/notifications.gateway.ts) | TypeScript | 12 | 0 | 4 | 16 |
| [services/socket.io/src/app/socket.controller.ts](/services/socket.io/src/app/socket.controller.ts) | TypeScript | 27 | 0 | 4 | 31 |
| [services/socket.io/src/app/socket.gateway.ts](/services/socket.io/src/app/socket.gateway.ts) | TypeScript | 69 | 0 | 15 | 84 |
| [services/socket.io/src/app/socket.service.ts](/services/socket.io/src/app/socket.service.ts) | TypeScript | 123 | 2 | 37 | 162 |
| [services/socket.io/src/main.ts](/services/socket.io/src/main.ts) | TypeScript | 50 | 0 | 11 | 61 |
| [services/socket.io/tsconfig.app.json](/services/socket.io/tsconfig.app.json) | JSON | 13 | 1 | 1 | 15 |
| [services/socket.io/tsconfig.json](/services/socket.io/tsconfig.json) | JSON with Comments | 33 | 0 | 1 | 34 |
| [services/team/package.json](/services/team/package.json) | JSON | 45 | 0 | 1 | 46 |
| [services/team/project.json](/services/team/project.json) | JSON | 10 | 0 | 1 | 11 |
| [services/team/src/main.ts](/services/team/src/main.ts) | TypeScript | 29 | 0 | 7 | 36 |
| [services/team/src/team/team.controller.ts](/services/team/src/team/team.controller.ts) | TypeScript | 41 | 0 | 9 | 50 |
| [services/team/src/team/team.module.ts](/services/team/src/team/team.module.ts) | TypeScript | 24 | 0 | 6 | 30 |
| [services/team/src/team/team.service.ts](/services/team/src/team/team.service.ts) | TypeScript | 86 | 0 | 20 | 106 |
| [services/team/tsconfig.app.json](/services/team/tsconfig.app.json) | JSON | 13 | 1 | 1 | 15 |
| [services/team/tsconfig.json](/services/team/tsconfig.json) | JSON with Comments | 33 | 0 | 1 | 34 |
| [services/user/package.json](/services/user/package.json) | JSON | 45 | 0 | 1 | 46 |
| [services/user/project.json](/services/user/project.json) | JSON | 10 | 0 | 1 | 11 |
| [services/user/src/main.ts](/services/user/src/main.ts) | TypeScript | 28 | 0 | 5 | 33 |
| [services/user/src/user/user.controller.ts](/services/user/src/user/user.controller.ts) | TypeScript | 32 | 0 | 7 | 39 |
| [services/user/src/user/user.module.ts](/services/user/src/user/user.module.ts) | TypeScript | 24 | 0 | 6 | 30 |
| [services/user/src/user/user.service.ts](/services/user/src/user/user.service.ts) | TypeScript | 105 | 0 | 21 | 126 |
| [services/user/tsconfig.app.json](/services/user/tsconfig.app.json) | JSON | 13 | 1 | 1 | 15 |
| [services/user/tsconfig.json](/services/user/tsconfig.json) | JSON with Comments | 33 | 0 | 1 | 34 |
| [services/web-ui/index.d.ts](/services/web-ui/index.d.ts) | TypeScript | 5 | 1 | 1 | 7 |
| [services/web-ui/next-env.d.ts](/services/web-ui/next-env.d.ts) | TypeScript | 0 | 5 | 2 | 7 |
| [services/web-ui/next.config.js](/services/web-ui/next.config.js) | JavaScript | 8 | 8 | 5 | 21 |
| [services/web-ui/package.json](/services/web-ui/package.json) | JSON | 7 | 0 | 2 | 9 |
| [services/web-ui/postcss.config.js](/services/web-ui/postcss.config.js) | JavaScript | 6 | 0 | 1 | 7 |
| [services/web-ui/public/images/icons/GUI\_icon.svg](/services/web-ui/public/images/icons/GUI_icon.svg) | XML | 7 | 0 | 1 | 8 |
| [services/web-ui/public/images/icons/align\_center\_icon.svg](/services/web-ui/public/images/icons/align_center_icon.svg) | XML | 3 | 0 | 1 | 4 |
| [services/web-ui/public/images/icons/align\_end\_icon.svg](/services/web-ui/public/images/icons/align_end_icon.svg) | XML | 3 | 0 | 1 | 4 |
| [services/web-ui/public/images/icons/align\_start\_icon.svg](/services/web-ui/public/images/icons/align_start_icon.svg) | XML | 3 | 0 | 1 | 4 |
| [services/web-ui/public/images/icons/arow\_left\_icon.svg](/services/web-ui/public/images/icons/arow_left_icon.svg) | XML | 3 | 0 | 1 | 4 |
| [services/web-ui/public/images/icons/arrow\_down\_icon.svg](/services/web-ui/public/images/icons/arrow_down_icon.svg) | XML | 3 | 0 | 1 | 4 |
| [services/web-ui/public/images/icons/arrow\_right\_icon.svg](/services/web-ui/public/images/icons/arrow_right_icon.svg) | XML | 3 | 0 | 1 | 4 |
| [services/web-ui/public/images/icons/arrow\_up\_icon.svg](/services/web-ui/public/images/icons/arrow_up_icon.svg) | XML | 3 | 0 | 1 | 4 |
| [services/web-ui/public/images/icons/cross\_icon.svg](/services/web-ui/public/images/icons/cross_icon.svg) | XML | 3 | 0 | 1 | 4 |
| [services/web-ui/public/images/icons/dashboard\_icon.svg](/services/web-ui/public/images/icons/dashboard_icon.svg) | XML | 3 | 0 | 1 | 4 |
| [services/web-ui/public/images/icons/executive\_servers\_icon.svg](/services/web-ui/public/images/icons/executive_servers_icon.svg) | XML | 4 | 0 | 1 | 5 |
| [services/web-ui/public/images/icons/flow\_icon.svg](/services/web-ui/public/images/icons/flow_icon.svg) | XML | 3 | 0 | 1 | 4 |
| [services/web-ui/public/images/icons/flows\_icon.svg](/services/web-ui/public/images/icons/flows_icon.svg) | XML | 4 | 0 | 1 | 5 |
| [services/web-ui/public/images/icons/genworkers\_icon.svg](/services/web-ui/public/images/icons/genworkers_icon.svg) | XML | 4 | 0 | 1 | 5 |
| [services/web-ui/public/images/icons/info\_icon.svg](/services/web-ui/public/images/icons/info_icon.svg) | XML | 3 | 0 | 1 | 4 |
| [services/web-ui/public/images/icons/play\_icon.svg](/services/web-ui/public/images/icons/play_icon.svg) | XML | 3 | 0 | 1 | 4 |
| [services/web-ui/public/images/icons/plugins\_icon.svg](/services/web-ui/public/images/icons/plugins_icon.svg) | XML | 3 | 0 | 1 | 4 |
| [services/web-ui/public/images/icons/plus\_icon.svg](/services/web-ui/public/images/icons/plus_icon.svg) | XML | 3 | 0 | 1 | 4 |
| [services/web-ui/public/images/icons/position\_default\_icon.svg](/services/web-ui/public/images/icons/position_default_icon.svg) | XML | 3 | 0 | 1 | 4 |
| [services/web-ui/public/images/icons/position\_down\_icon.svg](/services/web-ui/public/images/icons/position_down_icon.svg) | XML | 3 | 0 | 1 | 4 |
| [services/web-ui/public/images/icons/position\_left\_icon.svg](/services/web-ui/public/images/icons/position_left_icon.svg) | XML | 3 | 0 | 1 | 4 |
| [services/web-ui/public/images/icons/position\_right\_icon.svg](/services/web-ui/public/images/icons/position_right_icon.svg) | XML | 3 | 0 | 1 | 4 |
| [services/web-ui/public/images/icons/position\_up\_icon.svg](/services/web-ui/public/images/icons/position_up_icon.svg) | XML | 3 | 0 | 1 | 4 |
| [services/web-ui/public/images/icons/profileimage\_icon.svg](/services/web-ui/public/images/icons/profileimage_icon.svg) | XML | 4 | 0 | 1 | 5 |
| [services/web-ui/public/images/icons/settings\_icon.svg](/services/web-ui/public/images/icons/settings_icon.svg) | XML | 3 | 0 | 1 | 4 |
| [services/web-ui/public/images/icons/swap\_icon.svg](/services/web-ui/public/images/icons/swap_icon.svg) | XML | 3 | 0 | 1 | 4 |
| [services/web-ui/public/images/icons/template\_icon.svg](/services/web-ui/public/images/icons/template_icon.svg) | XML | 3 | 0 | 1 | 4 |
| [services/web-ui/public/images/logo\_full.svg](/services/web-ui/public/images/logo_full.svg) | XML | 9 | 0 | 1 | 10 |
| [services/web-ui/src/app/(auth)/forgot-password/page.tsx](/services/web-ui/src/app/(auth)/forgot-password/page.tsx) | TypeScript JSX | 5 | 0 | 3 | 8 |
| [services/web-ui/src/app/(auth)/layout.tsx](/services/web-ui/src/app/(auth)/layout.tsx) | TypeScript JSX | 11 | 0 | 5 | 16 |
| [services/web-ui/src/app/(auth)/login/page.tsx](/services/web-ui/src/app/(auth)/login/page.tsx) | TypeScript JSX | 5 | 0 | 3 | 8 |
| [services/web-ui/src/app/(auth)/register/page.tsx](/services/web-ui/src/app/(auth)/register/page.tsx) | TypeScript JSX | 5 | 0 | 3 | 8 |
| [services/web-ui/src/app/(authorized)/(with\_menu)/dashboard/page.tsx](/services/web-ui/src/app/(authorized)/(with_menu)/dashboard/page.tsx) | TypeScript JSX | 4 | 0 | 2 | 6 |
| [services/web-ui/src/app/(authorized)/(with\_menu)/executive-servers/page.tsx](/services/web-ui/src/app/(authorized)/(with_menu)/executive-servers/page.tsx) | TypeScript JSX | 4 | 0 | 2 | 6 |
| [services/web-ui/src/app/(authorized)/(with\_menu)/flow/page.tsx](/services/web-ui/src/app/(authorized)/(with_menu)/flow/page.tsx) | TypeScript JSX | 4 | 0 | 2 | 6 |
| [services/web-ui/src/app/(authorized)/(with\_menu)/flows/page.tsx](/services/web-ui/src/app/(authorized)/(with_menu)/flows/page.tsx) | TypeScript JSX | 4 | 0 | 2 | 6 |
| [services/web-ui/src/app/(authorized)/(with\_menu)/genworkers/page.tsx](/services/web-ui/src/app/(authorized)/(with_menu)/genworkers/page.tsx) | TypeScript JSX | 4 | 0 | 2 | 6 |
| [services/web-ui/src/app/(authorized)/(with\_menu)/layout.tsx](/services/web-ui/src/app/(authorized)/(with_menu)/layout.tsx) | TypeScript JSX | 16 | 0 | 4 | 20 |
| [services/web-ui/src/app/(authorized)/(with\_menu)/plugins/page.tsx](/services/web-ui/src/app/(authorized)/(with_menu)/plugins/page.tsx) | TypeScript JSX | 4 | 0 | 2 | 6 |
| [services/web-ui/src/app/(authorized)/(with\_menu)/settings/page.tsx](/services/web-ui/src/app/(authorized)/(with_menu)/settings/page.tsx) | TypeScript JSX | 4 | 0 | 2 | 6 |
| [services/web-ui/src/app/(authorized)/confirm-email/page.tsx](/services/web-ui/src/app/(authorized)/confirm-email/page.tsx) | TypeScript JSX | 5 | 0 | 3 | 8 |
| [services/web-ui/src/app/(authorized)/layout.tsx](/services/web-ui/src/app/(authorized)/layout.tsx) | TypeScript JSX | 41 | 0 | 10 | 51 |
| [services/web-ui/src/app/globals.css](/services/web-ui/src/app/globals.css) | PostCSS | 28 | 1 | 9 | 38 |
| [services/web-ui/src/app/layout.tsx](/services/web-ui/src/app/layout.tsx) | TypeScript JSX | 26 | 0 | 4 | 30 |
| [services/web-ui/src/app/page.tsx](/services/web-ui/src/app/page.tsx) | TypeScript JSX | 4 | 0 | 2 | 6 |
| [services/web-ui/src/components/Aside/Artifacts.tsx](/services/web-ui/src/components/Aside/Artifacts.tsx) | TypeScript JSX | 17 | 0 | 2 | 19 |
| [services/web-ui/src/components/Aside/Aside.tsx](/services/web-ui/src/components/Aside/Aside.tsx) | TypeScript JSX | 52 | 0 | 4 | 56 |
| [services/web-ui/src/components/Aside/EmptyContent.tsx](/services/web-ui/src/components/Aside/EmptyContent.tsx) | TypeScript JSX | 8 | 0 | 1 | 9 |
| [services/web-ui/src/components/Aside/Hierarchy.tsx](/services/web-ui/src/components/Aside/Hierarchy.tsx) | TypeScript JSX | 42 | 0 | 8 | 50 |
| [services/web-ui/src/components/Aside/Inspector.tsx](/services/web-ui/src/components/Aside/Inspector.tsx) | TypeScript JSX | 60 | 0 | 8 | 68 |
| [services/web-ui/src/components/Aside/Nodes.tsx](/services/web-ui/src/components/Aside/Nodes.tsx) | TypeScript JSX | 83 | 1 | 13 | 97 |
| [services/web-ui/src/components/Button.tsx](/services/web-ui/src/components/Button.tsx) | TypeScript JSX | 10 | 0 | 0 | 10 |
| [services/web-ui/src/components/ExternalNodeRenderer.tsx](/services/web-ui/src/components/ExternalNodeRenderer.tsx) | TypeScript JSX | 40 | 3 | 7 | 50 |
| [services/web-ui/src/components/FlowWorkspace.tsx](/services/web-ui/src/components/FlowWorkspace.tsx) | TypeScript JSX | 130 | 4 | 20 | 154 |
| [services/web-ui/src/components/Header.tsx](/services/web-ui/src/components/Header.tsx) | TypeScript JSX | 15 | 0 | 5 | 20 |
| [services/web-ui/src/components/Icon.tsx](/services/web-ui/src/components/Icon.tsx) | TypeScript JSX | 7 | 0 | 3 | 10 |
| [services/web-ui/src/components/Nav.tsx](/services/web-ui/src/components/Nav.tsx) | TypeScript JSX | 28 | 0 | 3 | 31 |
| [services/web-ui/src/components/TopBar.tsx](/services/web-ui/src/components/TopBar.tsx) | TypeScript JSX | 24 | 0 | 4 | 28 |
| [services/web-ui/src/components/inputs/TextInput.tsx](/services/web-ui/src/components/inputs/TextInput.tsx) | TypeScript JSX | 21 | 0 | 1 | 22 |
| [services/web-ui/src/components/node/DefaultNode.tsx](/services/web-ui/src/components/node/DefaultNode.tsx) | TypeScript JSX | 135 | 2 | 16 | 153 |
| [services/web-ui/src/components/node/inputWidgets/LabelWidget.tsx](/services/web-ui/src/components/node/inputWidgets/LabelWidget.tsx) | TypeScript JSX | 14 | 0 | 1 | 15 |
| [services/web-ui/src/components/node/inputWidgets/LineInputWidget.tsx](/services/web-ui/src/components/node/inputWidgets/LineInputWidget.tsx) | TypeScript JSX | 23 | 0 | 1 | 24 |
| [services/web-ui/src/components/node/inputWidgets/NumberInputWidget.tsx](/services/web-ui/src/components/node/inputWidgets/NumberInputWidget.tsx) | TypeScript JSX | 20 | 0 | 1 | 21 |
| [services/web-ui/src/components/node/inputWidgets/SelectWidget.tsx](/services/web-ui/src/components/node/inputWidgets/SelectWidget.tsx) | TypeScript JSX | 27 | 0 | 1 | 28 |
| [services/web-ui/src/hooks/useAuth.ts](/services/web-ui/src/hooks/useAuth.ts) | TypeScript | 30 | 0 | 8 | 38 |
| [services/web-ui/src/pages/auth/ForgotPassword.tsx](/services/web-ui/src/pages/auth/ForgotPassword.tsx) | TypeScript JSX | 7 | 0 | 1 | 8 |
| [services/web-ui/src/pages/auth/Login.tsx](/services/web-ui/src/pages/auth/Login.tsx) | TypeScript JSX | 42 | 0 | 9 | 51 |
| [services/web-ui/src/pages/auth/Register.tsx](/services/web-ui/src/pages/auth/Register.tsx) | TypeScript JSX | 46 | 0 | 7 | 53 |
| [services/web-ui/src/pages/authorized/ConfirmEmail.tsx](/services/web-ui/src/pages/authorized/ConfirmEmail.tsx) | TypeScript JSX | 42 | 0 | 6 | 48 |
| [services/web-ui/src/pages/authorized/Dashboard.tsx](/services/web-ui/src/pages/authorized/Dashboard.tsx) | TypeScript JSX | 80 | 0 | 7 | 87 |
| [services/web-ui/src/pages/authorized/ExecutiveServers.tsx](/services/web-ui/src/pages/authorized/ExecutiveServers.tsx) | TypeScript JSX | 7 | 0 | 1 | 8 |
| [services/web-ui/src/pages/authorized/Flow.tsx](/services/web-ui/src/pages/authorized/Flow.tsx) | TypeScript JSX | 126 | 1 | 31 | 158 |
| [services/web-ui/src/pages/authorized/Flows.tsx](/services/web-ui/src/pages/authorized/Flows.tsx) | TypeScript JSX | 7 | 0 | 1 | 8 |
| [services/web-ui/src/pages/authorized/Genworkers.tsx](/services/web-ui/src/pages/authorized/Genworkers.tsx) | TypeScript JSX | 209 | 0 | 22 | 231 |
| [services/web-ui/src/pages/authorized/Plugins.tsx](/services/web-ui/src/pages/authorized/Plugins.tsx) | TypeScript JSX | 7 | 0 | 1 | 8 |
| [services/web-ui/src/pages/authorized/Settings.tsx](/services/web-ui/src/pages/authorized/Settings.tsx) | TypeScript JSX | 23 | 0 | 6 | 29 |
| [services/web-ui/src/pages/unauthorized/Welcome.tsx](/services/web-ui/src/pages/unauthorized/Welcome.tsx) | TypeScript JSX | 29 | 0 | 3 | 32 |
| [services/web-ui/src/socket/SocketProvider.tsx](/services/web-ui/src/socket/SocketProvider.tsx) | TypeScript JSX | 9 | 0 | 1 | 10 |
| [services/web-ui/src/socket/socket.ts](/services/web-ui/src/socket/socket.ts) | TypeScript | 10 | 0 | 3 | 13 |
| [services/web-ui/src/store/flow.default.ts](/services/web-ui/src/store/flow.default.ts) | TypeScript | 7 | 0 | 0 | 7 |
| [services/web-ui/src/store/flow.type.ts](/services/web-ui/src/store/flow.type.ts) | TypeScript | 13 | 0 | 4 | 17 |
| [services/web-ui/src/store/index.ts](/services/web-ui/src/store/index.ts) | TypeScript | 24 | 0 | 3 | 27 |
| [services/web-ui/src/store/nodes/node.default.ts](/services/web-ui/src/store/nodes/node.default.ts) | TypeScript | 61 | 0 | 0 | 61 |
| [services/web-ui/src/store/nodes/nodesRegistry.ts](/services/web-ui/src/store/nodes/nodesRegistry.ts) | TypeScript | 14 | 2 | 6 | 22 |
| [services/web-ui/src/store/nodes/packets/GenFlow/Text/TextInput.json](/services/web-ui/src/store/nodes/packets/GenFlow/Text/TextInput.json) | JSON | 28 | 0 | 1 | 29 |
| [services/web-ui/src/store/nodes/packets/GenFlow/config.json](/services/web-ui/src/store/nodes/packets/GenFlow/config.json) | JSON | 8 | 0 | 0 | 8 |
| [services/web-ui/src/store/provider.tsx](/services/web-ui/src/store/provider.tsx) | TypeScript JSX | 6 | 0 | 1 | 7 |
| [services/web-ui/src/store/slices/artifactsSlice.tsx](/services/web-ui/src/store/slices/artifactsSlice.tsx) | TypeScript JSX | 35 | 0 | 4 | 39 |
| [services/web-ui/src/store/slices/authSlice.tsx](/services/web-ui/src/store/slices/authSlice.tsx) | TypeScript JSX | 38 | 0 | 2 | 40 |
| [services/web-ui/src/store/slices/clientSlice.tsx](/services/web-ui/src/store/slices/clientSlice.tsx) | TypeScript JSX | 47 | 0 | 2 | 49 |
| [services/web-ui/src/store/slices/defaults/defaultNode.tsx](/services/web-ui/src/store/slices/defaults/defaultNode.tsx) | TypeScript JSX | 78 | 0 | 0 | 78 |
| [services/web-ui/src/store/slices/flowsSlice.tsx](/services/web-ui/src/store/slices/flowsSlice.tsx) | TypeScript JSX | 62 | 1 | 6 | 69 |
| [services/web-ui/src/store/slices/packagesSlice.tsx](/services/web-ui/src/store/slices/packagesSlice.tsx) | TypeScript JSX | 29 | 0 | 2 | 31 |
| [services/web-ui/src/store/slices/projectSlice.tsx](/services/web-ui/src/store/slices/projectSlice.tsx) | TypeScript JSX | 54 | 0 | 6 | 60 |
| [services/web-ui/src/store/slices/sessionSlice.tsx](/services/web-ui/src/store/slices/sessionSlice.tsx) | TypeScript JSX | 26 | 0 | 3 | 29 |
| [services/web-ui/src/store/slices/teamSlice.tsx](/services/web-ui/src/store/slices/teamSlice.tsx) | TypeScript JSX | 41 | 0 | 3 | 44 |
| [services/web-ui/src/store/thunks/auth/loginThunk.ts](/services/web-ui/src/store/thunks/auth/loginThunk.ts) | TypeScript | 32 | 0 | 9 | 41 |
| [services/web-ui/src/store/thunks/auth/logoutThunk.ts](/services/web-ui/src/store/thunks/auth/logoutThunk.ts) | TypeScript | 14 | 0 | 5 | 19 |
| [services/web-ui/src/store/thunks/auth/registerThunk.ts](/services/web-ui/src/store/thunks/auth/registerThunk.ts) | TypeScript | 35 | 0 | 5 | 40 |
| [services/web-ui/src/store/thunks/client/fetchClientThunk.ts](/services/web-ui/src/store/thunks/client/fetchClientThunk.ts) | TypeScript | 41 | 0 | 8 | 49 |
| [services/web-ui/src/store/thunks/client/verifyEmailThunk.ts](/services/web-ui/src/store/thunks/client/verifyEmailThunk.ts) | TypeScript | 17 | 0 | 5 | 22 |
| [services/web-ui/src/store/thunks/flow/addNodeThunk.ts](/services/web-ui/src/store/thunks/flow/addNodeThunk.ts) | TypeScript | 18 | 0 | 1 | 19 |
| [services/web-ui/src/store/thunks/flow/assignGenWorkerToFlowThunk.ts](/services/web-ui/src/store/thunks/flow/assignGenWorkerToFlowThunk.ts) | TypeScript | 13 | 0 | 2 | 15 |
| [services/web-ui/src/store/thunks/flow/createFlowThunk.ts](/services/web-ui/src/store/thunks/flow/createFlowThunk.ts) | TypeScript | 29 | 0 | 4 | 33 |
| [services/web-ui/src/store/thunks/flow/executeFlowThunk.ts](/services/web-ui/src/store/thunks/flow/executeFlowThunk.ts) | TypeScript | 25 | 0 | 4 | 29 |
| [services/web-ui/src/store/thunks/flow/featchNodesThunk.ts](/services/web-ui/src/store/thunks/flow/featchNodesThunk.ts) | TypeScript | 9 | 0 | 1 | 10 |
| [services/web-ui/src/store/thunks/flow/onConnectThunk.ts](/services/web-ui/src/store/thunks/flow/onConnectThunk.ts) | TypeScript | 13 | 0 | 2 | 15 |
| [services/web-ui/src/store/thunks/flow/onEdgesChangeThunk.ts](/services/web-ui/src/store/thunks/flow/onEdgesChangeThunk.ts) | TypeScript | 13 | 0 | 2 | 15 |
| [services/web-ui/src/store/thunks/flow/onNodesChangeThunk.ts](/services/web-ui/src/store/thunks/flow/onNodesChangeThunk.ts) | TypeScript | 12 | 0 | 2 | 14 |
| [services/web-ui/src/store/thunks/nodes/loadNodesThunk.ts](/services/web-ui/src/store/thunks/nodes/loadNodesThunk.ts) | TypeScript | 21 | 0 | 5 | 26 |
| [services/web-ui/src/utils/DnDContext.jsx](/services/web-ui/src/utils/DnDContext.jsx) | JavaScript JSX | 14 | 0 | 5 | 19 |
| [services/web-ui/src/utils/apollo-client.ts](/services/web-ui/src/utils/apollo-client.ts) | TypeScript | 7 | 0 | 2 | 9 |
| [services/web-ui/src/utils/config.tsx](/services/web-ui/src/utils/config.tsx) | TypeScript JSX | 15 | 0 | 3 | 18 |
| [services/web-ui/src/utils/fetchServer.ts](/services/web-ui/src/utils/fetchServer.ts) | TypeScript | 14 | 0 | 3 | 17 |
| [services/web-ui/tailwind.config.js](/services/web-ui/tailwind.config.js) | JavaScript | 32 | 1 | 3 | 36 |
| [services/web-ui/tsconfig.json](/services/web-ui/tsconfig.json) | JSON with Comments | 51 | 8 | 1 | 60 |
| [tsconfig.base.json](/tsconfig.base.json) | JSON | 46 | 0 | 5 | 51 |
| [tsconfig.json](/tsconfig.json) | JSON with Comments | 41 | 0 | 10 | 51 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)