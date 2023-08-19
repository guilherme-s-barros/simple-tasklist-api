import { TaskDocument } from '@/models/task'
import { TasksRepository } from '@/repositories/tasks-repository'

interface FetchUserTasksUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserTasksUseCaseResponse {
  tasks: TaskDocument[]
}

export class FetchUserTasksUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserTasksUseCaseRequest): Promise<FetchUserTasksUseCaseResponse> {
    const tasks = await this.tasksRepository.findManyByUserId(userId, page)

    return {
      tasks,
    }
  }
}
