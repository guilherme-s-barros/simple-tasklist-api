import { Task, TaskDocument } from '@/models/task'

import { CreateTaskInput, TasksRepository } from '../tasks-repository'

export class MongoTasksRepository implements TasksRepository {
  async findById(id: string) {
    const task = await Task.findById(id)

    return task
  }

  async findManyByUserId(userId: string, page: number) {
    const tasks = await Task.find({
      userId,
    })
      .limit(20)
      .skip((page - 1) * 20)
      .exec()

    return tasks
  }

  async findByIdAndDelete(id: string) {
    const task = await Task.findByIdAndDelete(id).exec()

    return task
  }

  async create(data: CreateTaskInput) {
    const task = new Task(data)

    await task.save()

    return task
  }

  async save(task: TaskDocument) {
    task.save()

    return task
  }
}
