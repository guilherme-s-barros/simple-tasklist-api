import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-tasks-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ToggleCompletedUseCase } from './toggle-completed'

let tasksRepository: InMemoryTasksRepository
let sut: ToggleCompletedUseCase

describe('Toggle task state use case', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new ToggleCompletedUseCase(tasksRepository)
  })

  it('should be able to check a task as completed', async () => {
    const createdTask = await tasksRepository.create({
      title: 'to-do 1',
      userId: 'user-id-01',
    })

    const { task } = await sut.execute({
      taskId: createdTask.id,
    })

    expect(task.completed).toEqual(true)
  })

  it('should be able to uncheck a completed task', async () => {
    const createdTask = await tasksRepository.create({
      title: 'to-do 1',
      userId: 'user-id-01',
    })

    await sut.execute({
      taskId: createdTask.id,
    })

    const { task } = await sut.execute({
      taskId: createdTask.id,
    })

    expect(task.completed).toEqual(false)
  })

  it('should not be able to check a non-existing task as completed', async () => {
    await expect(() =>
      sut.execute({
        taskId: 'non-existing-task-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
