import { TaskDocument } from '@/models/task'

export interface CreateTaskInput {
  title: string
  description?: string
  dueDate?: Date
  userId: string
}

export interface TasksRepository {
  create(data: CreateTaskInput): Promise<TaskDocument>
}
