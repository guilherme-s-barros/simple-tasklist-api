import { Document, model, Schema, Types } from 'mongoose'

export interface UserDocument extends Document {
  id: string
  name: string
  email: string
  passwordHash: string
  tasks: Array<typeof Types.ObjectId>
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
  tasks: [{ type: Types.ObjectId, ref: 'Task' }],
})

export const User = model('User', userSchema)
