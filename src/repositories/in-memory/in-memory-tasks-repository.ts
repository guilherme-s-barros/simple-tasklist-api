import { Task, TaskDocument } from '@/models/task'

import { CreateTaskInput, TasksRepository } from '../tasks-repository'

export class InMemoryTasksRepository implements TasksRepository {
  public items: TaskDocument[] = []

  async findByUserId(userId: string) {
    const tasks = this.items.filter((item) => item.userId.toString() === userId)

    return tasks
  }

  async create(data: CreateTaskInput) {
    const task = new Task(data)

    this.items.push(task)

    return task
  }
}
