import { TaskDocument } from '@/models/task'

export interface CreateTaskInput {
  title: string
  description?: string | null
  dueDate?: Date | null
  userId: string
}

export interface TasksRepository {
  findById(id: string): Promise<TaskDocument | null>
  findManyByUserId(userId: string, page: number): Promise<TaskDocument[]>
  findByIdAndDelete(id: string): Promise<TaskDocument | null>
  create(data: CreateTaskInput): Promise<TaskDocument>
  save(task: TaskDocument): Promise<TaskDocument>
}
