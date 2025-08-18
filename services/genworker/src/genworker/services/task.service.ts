import { Injectable, OnModuleInit } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task as TaskSchema, TaskDocument } from '@shared/schema/task.shema';
import { Task } from '@shared/types/Task.type';
import { ResponseService } from '@libs/shared/src/sharedServices/response.service';


@Injectable()
export class TaskService implements OnModuleInit {
  onModuleInit() {}

  constructor(
    @InjectModel(TaskSchema.name) private taskModel: Model<TaskDocument>,
    private readonly logger: PinoLogger,
    private readonly response: ResponseService
  ) {}

  async create(data) {
    const context = 'create';

    console.log(context, data)

    const createdTask:Task|any = await this.taskModel.create({...data, owner: new Types.ObjectId(data.ownerId)});
    console.log(context, createdTask);
    if (!createdTask) return this.response.error({res:{msg:"Task creation failed"}}, {context});

    return this.response.success({res:{msg:"Task created"}, task: {...createdTask.task, id: createdTask._id.toString()}}, {context});
  }
  async update(data) {
    const context = 'update';

    const updatedTask = await this.taskModel.findByIdAndUpdate(
      data.id,
      { ...data.task },
      { new: true },
    );

    if (!updatedTask) return this.response.error({res:{msg:"Task not found"}}, {context});

    return this.response.success({res:{msg:"Task updated"}}, {context});
  }
  async findOneById(data) {
    const context = 'findOneById';

    const task = await this.taskModel.findById(data.id).lean();
    if (!task) return this.response.fail({res:{msg:"Task not found"}}, {context});

    return this.response.success({
        res:{msg:"Task found"},
        task: {
        ...task,
        id: task._id.toString(),
      }}, {context});
  }
}
