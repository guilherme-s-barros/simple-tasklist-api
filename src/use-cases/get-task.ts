import { TaskDocument } from '@/models/task'
import { TasksRepository } from '@/repositories/tasks-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetTaskUseCaseRequest {
  taskId: string
}

interface GetTaskUseCaseResponse {
  task: TaskDocument
}

export class GetTaskUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute({
    taskId,
  }: GetTaskUseCaseRequest): Promise<GetTaskUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    return {
      task,
    }
  }
}
