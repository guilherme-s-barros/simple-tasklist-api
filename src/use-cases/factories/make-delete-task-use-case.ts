import { MongoTasksRepository } from '@/repositories/mongo/mongo-tasks-repository'

import { DeleteTaskUseCase } from '../delete-task'

export function makeDeleteTaskUseCase() {
  const tasksRepository = new MongoTasksRepository()
  const useCase = new DeleteTaskUseCase(tasksRepository)

  return useCase
}
