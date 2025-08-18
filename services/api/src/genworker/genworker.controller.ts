import { Controller, Post, Body, Req } from '@nestjs/common';
import { Public } from '@api/guards/auth.public';
import { ApiGenWorkerService } from './genworker.service';
import { EnqueueRequest, FinishPartialTaskRequest, FinishTaskRequest, GenWorkerAssignRequest, GenWorkerDisconnectRequest, RegisterRequest } from '@proto/genworker/genworker';

@Controller('task-queue')
export class ApiGenWorkerController {
  constructor(private readonly genWorkerService: ApiGenWorkerService) {}

  @Post('enqueue-task')
  async enqueueTask(@Body() body: EnqueueRequest) {
    return this.genWorkerService.enqueueTask({...body, data: JSON.stringify(body.data)});
  }

  @Post('finish-partial-task')
  async finishPartialTask(@Body() body: FinishPartialTaskRequest) {
    return this.genWorkerService.finishPartialTask(body);
  }

  @Post('finish-task')
  async finishTask(@Body() body: FinishTaskRequest) {
    return this.genWorkerService.finishTask(body);
  }

  @Post('register')
  async register(@Body() body: RegisterRequest) {
    return this.genWorkerService.register(body);
  }

  @Post('genworker-assign')
  async genWorkerAssign(@Body() body: GenWorkerAssignRequest) {
    return this.genWorkerService.genWorkerAssign(body);
  }

  @Post('genworker-disconnect')
  async genWorkerDisconnect(@Body() body: GenWorkerDisconnectRequest) {
    return this.genWorkerService.genWorkerDisconnect(body);
  }
  
}