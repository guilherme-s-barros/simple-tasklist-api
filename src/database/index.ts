import mongoose from 'mongoose'

import { env } from '@/env'

export async function createConnection() {
  try {
    await mongoose.connect(env.DATABASE_URL)

    console.log('Successfully connected to MongoDB.')
  } catch (error) {
    console.log('Error connecting to MongoDB.')
  }
}
