import { UserDocument } from '@/models/user'

export interface CreateUserInput {
  name: string
  email: string
  passwordHash: string
}

export interface UsersRepository {
  create(data: CreateUserInput): Promise<UserDocument>
  findByEmail(email: string): Promise<UserDocument | null>
}
