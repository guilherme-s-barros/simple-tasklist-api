import { Document, model, Schema } from 'mongoose'

export interface UserDocument extends Document {
  name: string
  email: string
  passwordHash: string
}

const userSchema = new Schema<UserDocument>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
})

export const User = model('User', userSchema)
