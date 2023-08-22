import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-tasks-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetTaskUseCase } from './get-task'

let tasksRepository: InMemoryTasksRepository
let sut: GetTaskUseCase

describe('Get a task use case', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new GetTaskUseCase(tasksRepository)
  })

  it('should be able to get a task', async () => {
    const createdTask = await tasksRepository.create({
      title: 'to-do 1',
      userId: 'user-id-01',
      description: 'to-do description',
      dueDate: new Date(),
    })

    const { task } = await sut.execute({
      taskId: createdTask.id,
    })

    expect(task.id).toEqual(expect.any(String))
  })

  it('should not be able to get a non-existing task', async () => {
    await expect(() =>
      sut.execute({
        taskId: 'non-existing-task-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
