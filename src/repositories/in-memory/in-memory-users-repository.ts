import { User, UserDocument } from '@/models/user'

import { CreateUserInput, UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: UserDocument[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: CreateUserInput) {
    const user = new User(data)

    this.items.push(user)

    return user
  }
}
