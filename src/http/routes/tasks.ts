import { FastifyInstance } from 'fastify'

import { create } from '../controllers/tasks/create'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function tasksRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/tasks', create)
}
