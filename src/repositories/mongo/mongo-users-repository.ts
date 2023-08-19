import { User } from '@/models/user'

import { CreateUserInput, UsersRepository } from '../users-repository'

export class MongoUsersRepository implements UsersRepository {
  async create(data: CreateUserInput) {
    const user = new User(data)

    await user.save()

    return user
  }

  async findByEmail(email: string) {
    const user = await User.findOne({
      email,
    }).exec()

    return user
  }

  async findById(id: string) {
    const user = await User.findById(id).exec()

    return user
  }
}
