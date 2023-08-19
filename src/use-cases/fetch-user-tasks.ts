import { TaskDocument } from '@/models/task'
import { TasksRepository } from '@/repositories/tasks-repository'

interface FetchUserTasksUseCaseRequest {
  userId: string
}

interface FetchUserTasksUseCaseResponse {
  tasks: TaskDocument[]
}

export class FetchUserTasksUseCase {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async execute({
    userId,
  }: FetchUserTasksUseCaseRequest): Promise<FetchUserTasksUseCaseResponse> {
    const tasks = await this.tasksRepository.findByUserId(userId)

    return {
      tasks,
    }
  }
}
