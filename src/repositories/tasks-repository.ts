import { TaskDocument } from '@/models/task'

export interface CreateTaskInput {
  title: string
  description?: string
  dueDate?: Date
  userId: string
}

export interface TasksRepository {
  findById(id: string): Promise<TaskDocument | null>
  findManyByUserId(userId: string, page: number): Promise<TaskDocument[]>
  create(data: CreateTaskInput): Promise<TaskDocument>
  save(task: TaskDocument): Promise<TaskDocument>
}
