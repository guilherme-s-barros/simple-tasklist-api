import { Document, Schema, Types, model } from 'mongoose'

export interface TaskDocument extends Document {
  id: string
  title: string
  description?: string
  userId: typeof Types.ObjectId
  dueDate?: Date
  done: boolean
}

const taskSchema = new Schema<TaskDocument>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dueDate: {
    type: Date,
    required: false,
  },
  done: {
    type: Boolean,
    default: false,
  },
})

export const Task = model('Task', taskSchema)
