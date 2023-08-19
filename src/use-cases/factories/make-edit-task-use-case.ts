import { MongoTasksRepository } from '@/repositories/mongo/mongo-tasks-repository'

import { EditTaskUseCase } from '../edit-task'

export function makeEditTaskUseCase() {
  const tasksRepository = new MongoTasksRepository()
  const useCase = new EditTaskUseCase(tasksRepository)

  return useCase
}
