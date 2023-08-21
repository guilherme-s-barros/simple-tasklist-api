import { TaskDocument } from '@/models/task'
import { TasksRepository } from '@/repositories/tasks-repository'
import { UsersRepository } from '@/repositories/users-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreateTaskUseCaseRequest {
  title: string
  description: string | null
  dueDate: Date | null
  userId: string
}

interface CreateTaskUseCaseResponse {
  task: TaskDocument
}

export class CreateTaskUseCase {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({
    title,
    description,
    dueDate,
    userId,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const task = await this.tasksRepository.create({
      title,
      description,
      dueDate,
      userId,
    })

    return {
      task,
    }
  }
}
