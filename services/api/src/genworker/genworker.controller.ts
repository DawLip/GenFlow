import { Controller, Post, Body, Req, Get, Param, Query } from '@nestjs/common';
import { Public } from '@api/guards/auth.public';
import { ApiGenWorkerService } from './genworker.service';
import { EnqueueRequest, FinishPartialTaskRequest, GetTaskByIdRequest, FinishTaskRequest, GenWorkerAssignRequest, GenWorkerAssignToFlowRequest, GenWorkerDisconnectRequest, GetGenWorkersAssignedToFlowRequest, RegisterRequest, GenWorkerAssignToTeamRequest, GenWorkerAssignToProjectRequest, GenWorkerTeamRemoveStorageRequest, GenWorkerTeamAddStorageRequest, GenWorkerTeamSetMasterRequest, GenWorkerRemoveFromTeamRequest } from '@proto/genworker/genworker';

@Controller('task-queue')
export class ApiGenWorkerController {
  constructor(private readonly genWorkerService: ApiGenWorkerService) {}

  @Get('tasks/:taskId')
  async getTask(@Body() body: GetTaskByIdRequest, @Param('taskId') taskId: string, @Query('genworker') genworker?: boolean) {
    return this.genWorkerService.getTask({id: taskId, genworker: !!genworker});
  }

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

  @Get('genworker/:id')
  async getGenworker(@Param('id') id: string) {
    return this.genWorkerService.getGenworker({ id });
  }

  @Post('genworker-assign')
  async genWorkerAssign(@Body() body: GenWorkerAssignRequest) {
    return this.genWorkerService.genWorkerAssign(body);
  }
  //team
  @Post('genworker-assign-to-team')
  async genWorkerAssignToTeam(@Body() body: GenWorkerAssignToTeamRequest) {
    return this.genWorkerService.genWorkerAssignToTeam(body);
  }
  @Post('genworker-remove-from-team')
  async genWorkerRemoveFromTeam(@Body() body: GenWorkerRemoveFromTeamRequest) {
    return this.genWorkerService.genWorkerRemoveFromTeam(body);
  }
  @Post('genworker-team-set-master')
  async genWorkerTeamSetMaster(@Body() body: GenWorkerTeamSetMasterRequest) {
    return this.genWorkerService.genWorkerTeamSetMaster(body);
  }
  @Post('genworker-team-add-storage')
  async genWorkerTeamAddStorage(@Body() body: GenWorkerTeamAddStorageRequest) {
    return this.genWorkerService.genWorkerTeamAddStorage(body);
  }
  @Post('genworker-team-remove-storage')
  async genWorkerTeamRemoveStorage(@Body() body: GenWorkerTeamRemoveStorageRequest) {
    return this.genWorkerService.genWorkerTeamRemoveStorage(body);
  }

  //project
  @Post('genworker-assign-to-project')
  async genWorkerAssignToProject(@Body() body: GenWorkerAssignToProjectRequest) {
    return this.genWorkerService.genWorkerAssignToProject(body);
  }
  //flow
  @Post('genworker-assign-to-flow')
  async genWorkerAssignToFlow(@Body() body: GenWorkerAssignToFlowRequest) {
    return this.genWorkerService.genWorkerAssignToFlow(body);
  }

  @Post('get-genworkers-assigned-to-flow')
  async getGenWorkersAssignedToFlow(@Body() body: GetGenWorkersAssignedToFlowRequest) {
    return this.genWorkerService.getGenWorkersAssignedToFlow(body);
  }

  @Post('genworker-disconnect')
  async genWorkerDisconnect(@Body() body: GenWorkerDisconnectRequest) {
    return this.genWorkerService.genWorkerDisconnect(body);
  }
  
}