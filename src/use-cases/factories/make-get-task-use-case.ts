import { MongoTasksRepository } from '@/repositories/mongo/mongo-tasks-repository'

import { GetTaskUseCase } from '../get-task'

export function makeGetTaskUseCase() {
  const tasksRepository = new MongoTasksRepository()
  const useCase = new GetTaskUseCase(tasksRepository)

  return useCase
}
