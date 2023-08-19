import { MongoUsersRepository } from '@/repositories/mongo/mongo-users-repository'

import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new MongoUsersRepository()
  const useCase = new AuthenticateUseCase(usersRepository)

  return useCase
}
