import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

import { User } from '@/models/user'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await User.create({
    name: 'John Doe',
    email: 'johndoe@example.com',
    passwordHash: await hash('123456', 6),
  })

  const response = await request(app.server).post('/sessions').send({
    email: 'johndoe@example.com',
    password: '123456',
  })

  const { token } = response.body

  return {
    token: token as string,
  }
}
