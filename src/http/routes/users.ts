import { FastifyInstance } from 'fastify'

import { authenticate } from '../controllers/users/authenticate'
import { refresh } from '../controllers/users/refresh'
import { register } from '../controllers/users/register'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)
}
