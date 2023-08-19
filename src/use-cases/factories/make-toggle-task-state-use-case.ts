import { MongoTasksRepository } from '@/repositories/mongo/mongo-tasks-repository'

import { ToggleTaskStateUseCase } from '../toggle-task-state'

export function makeToggleTaskStateUseCase() {
  const tasksRepository = new MongoTasksRepository()
  const useCase = new ToggleTaskStateUseCase(tasksRepository)

  return useCase
}
