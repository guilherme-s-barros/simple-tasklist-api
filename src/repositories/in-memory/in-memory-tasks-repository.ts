import { Task, TaskDocument } from '@/models/task'

import { CreateTaskInput, TasksRepository } from '../tasks-repository'

export class InMemoryTasksRepository implements TasksRepository {
  public items: TaskDocument[] = []

  async create(data: CreateTaskInput) {
    const task = new Task(data)

    this.items.push(task)

    return task
  }
}
