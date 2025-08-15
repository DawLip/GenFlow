import { Controller, Post, Body, Req } from '@nestjs/common';
import { Public } from '@api/guards/auth.public';
import { ApiGenWorkerService } from './genworker.service';
import { DequeueRequest, EnqueueRequest } from '@proto/genworker/genworker';

@Controller('task-queue')
export class ApiGenWorkerController {
  constructor(private readonly genWorkerService: ApiGenWorkerService) {}

  @Public()
  @Post('enqueue')
  enqueue(@Body() body: EnqueueRequest) {
    return this.genWorkerService.enqueue({...body, data: JSON.stringify(body.data)});
  }

  @Public()
  @Post('dequeue')
  async dequeue(@Body() body: DequeueRequest) {
    const data = await this.genWorkerService.dequeue(body);
    return { ...data, data: JSON.parse(data.data || '{}') }; 
  }
}