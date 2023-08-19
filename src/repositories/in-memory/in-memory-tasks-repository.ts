import { Task, TaskDocument } from '@/models/task'

import { CreateTaskInput, TasksRepository } from '../tasks-repository'

export class InMemoryTasksRepository implements TasksRepository {
  public items: TaskDocument[] = []

  async findById(id: string) {
    const task = this.items.find((item) => item.id === id)

    if (!task) {
      return null
    }

    return task
  }

  async findManyByUserId(userId: string, page: number) {
    const tasks = this.items
      .filter((item) => item.userId.toString() === userId)
      .slice((page - 1) * 20, page * 20)

    return tasks
  }

  async findByIdAndDelete(id: string) {
    const taskIndex = this.items.findIndex((item) => item.id === id)

    if (taskIndex === -1) {
      return null
    }

    const [task] = this.items.splice(taskIndex, 1)

    return task
  }

  async create(data: CreateTaskInput) {
    const task = new Task(data)

    this.items.push(task)

    return task
  }

  async save(task: TaskDocument) {
    const taskIndex = this.items.findIndex((item) => item.id === task.id)

    if (taskIndex >= 0) {
      this.items[taskIndex] = task
    }

    return task
  }
}
