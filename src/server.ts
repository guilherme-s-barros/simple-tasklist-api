import { app } from './app'
import { createConnection } from './database'
import { env } from './env'

async function runServer() {
  await createConnection()

  app
    .listen({
      port: env.PORT,
      host: '0.0.0.0',
    })
    .then(() => {
      console.log('🚀 HTTP server is running.')
    })
}

runServer()
