import { UserDocument } from '@/models/user'

export interface CreateUserParams {
  name: string
  email: string
  passwordHash: string
}

export interface UsersRepository {
  create(user: CreateUserParams): Promise<UserDocument>
  findByEmail(email: string): Promise<UserDocument | null>
}
