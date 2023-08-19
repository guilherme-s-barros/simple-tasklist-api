import { TaskDocument } from '@/models/task'
import { TasksRepository } from '@/repositories/tasks-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteTaskUseCaseRequest {
  taskId: string
}

interface DeleteTaskUseCaseResponse {
  task: TaskDocument
}

export class DeleteTaskUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute({
    taskId,
  }: DeleteTaskUseCaseRequest): Promise<DeleteTaskUseCaseResponse> {
    const task = await this.tasksRepository.findByIdAndDelete(taskId)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    return {
      task,
    }
  }
}
