import { FastifyInstance } from 'fastify'

import { completed } from '../controllers/tasks/completed'
import { create } from '../controllers/tasks/create'
import { details } from '../controllers/tasks/details'
import { edit } from '../controllers/tasks/edit'
import { fetch } from '../controllers/tasks/fetch'
import { remove } from '../controllers/tasks/remove'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function tasksRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/tasks', fetch)
  app.get('/tasks/:taskId', details)
  app.put('/tasks/:taskId', edit)
  app.patch('/tasks/:taskId/completed', completed)
  app.delete('/tasks/:taskId', remove)
  app.post('/tasks', create)
}
