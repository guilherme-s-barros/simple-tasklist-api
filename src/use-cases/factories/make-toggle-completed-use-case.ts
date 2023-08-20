import { MongoTasksRepository } from '@/repositories/mongo/mongo-tasks-repository'

import { ToggleCompletedUseCase } from '../toggle-completed'

export function makeToggleCompletedUseCase() {
  const tasksRepository = new MongoTasksRepository()
  const useCase = new ToggleCompletedUseCase(tasksRepository)

  return useCase
}
