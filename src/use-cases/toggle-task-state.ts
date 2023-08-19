import { TaskDocument } from '@/models/task'
import { TasksRepository } from '@/repositories/tasks-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface ToggleTaskStateUseCaseRequest {
  taskId: string
}

interface ToggleTaskStateUseCaseResponse {
  task: TaskDocument
}

export class ToggleTaskStateUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute({
    taskId,
  }: ToggleTaskStateUseCaseRequest): Promise<ToggleTaskStateUseCaseResponse> {
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
