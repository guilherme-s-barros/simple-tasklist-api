import 'dotenv/config'
import mongoose from 'mongoose'
import { randomUUID } from 'node:crypto'

export default {
  name: 'mongo',
  transformMode: 'ssr',

  async setup() {
    const databaseURL = process.env.DATABASE_URL

    if (!databaseURL) {
      throw new Error('DATABASE_URL environment variable must be provided.')
    }

    const db = await mongoose.connect(databaseURL, {
      dbName: randomUUID(),
    })

    return {
      async teardown() {
        await db.connection.dropDatabase()
        await db.disconnect()
      },
    }
  },
}
