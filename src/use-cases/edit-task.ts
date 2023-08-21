import { TaskDocument } from '@/models/task'
import { TasksRepository } from '@/repositories/tasks-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface EditTaskUseCaseRequest {
  taskId: string
  title: string
  description: string | null
  dueDate: Date | null
}

interface EditTaskUseCaseResponse {
  task: TaskDocument
}

export class EditTaskUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute({
    taskId,
    title,
    description,
    dueDate,
  }: EditTaskUseCaseRequest): Promise<EditTaskUseCaseResponse> {
    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    Object.assign(task, {
      title,
      description,
      dueDate,
    })

    await this.tasksRepository.save(task)

    return {
      task,
    }
  }
}
