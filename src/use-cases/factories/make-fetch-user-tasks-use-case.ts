import { MongoTasksRepository } from '@/repositories/mongo/mongo-tasks-repository'

import { FetchUserTasksUseCase } from '../fetch-user-tasks'

export function makeFetchUserTasksUseCase() {
  const tasksRepository = new MongoTasksRepository()
  const useCase = new FetchUserTasksUseCase(tasksRepository)

  return useCase
}
