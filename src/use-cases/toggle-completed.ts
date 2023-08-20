import { TaskDocument } from '@/models/task'
import { TasksRepository } from '@/repositories/tasks-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ToggleCompletedUseCaseRequest {
  taskId: string
}

interface ToggleCompletedUseCaseResponse {
  task: TaskDocument
}

export class ToggleCompletedUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute({
    taskId,
  }: ToggleCompletedUseCaseRequest): Promise<ToggleCompletedUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    task.completed = !task.completed

    await this.tasksRepository.save(task)

    return {
      task,
    }
  }
}
