import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-tasks-repository'

import { EditTaskUseCase } from './edit-task'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let tasksRepository: InMemoryTasksRepository
let sut: EditTaskUseCase

describe('Edit a task use case', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new EditTaskUseCase(tasksRepository)
  })

  it('should be able to edit a task', async () => {
    const createdTask = await tasksRepository.create({
      title: 'to-do 1',
      userId: 'user-id-01',
      description: null,
      dueDate: null,
    })

    const { task } = await sut.execute({
      taskId: createdTask.id,
      title: 'updated to-do',
      description: 'updated to-do description',
      dueDate: new Date(),
    })

    expect(task.title).toEqual(expect.stringContaining('updated'))
    expect(task.description).toEqual(expect.stringContaining('updated'))
    expect(task.dueDate).toEqual(expect.any(Date))
  })

  it('should not be able to edit a non-existing task', async () => {
    await expect(() =>
      sut.execute({
        taskId: 'non-existing-task-id',
        title: 'updated to-do',
        description: 'updated to-do description',
        dueDate: new Date(),
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
