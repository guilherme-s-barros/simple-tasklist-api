import fastify from 'fastify'

import { createConnection } from './database'

createConnection()

export const app = fastify()
