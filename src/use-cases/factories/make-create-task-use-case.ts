import { MongoTasksRepository } from '@/repositories/mongo/mongo-tasks-repository'
import { MongoUsersRepository } from '@/repositories/mongo/mongo-users-repository'

import { CreateTaskUseCase } from '../create-task'

export function makeCreateTaskUseCase() {
  const tasksRepository = new MongoTasksRepository()
  const usersRepository = new MongoUsersRepository()

  const useCase = new CreateTaskUseCase(tasksRepository, usersRepository)

  return useCase
}
