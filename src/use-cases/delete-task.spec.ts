import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-tasks-repository'

import { DeleteTaskUseCase } from './delete-task'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let tasksRepository: InMemoryTasksRepository
let sut: DeleteTaskUseCase

describe('Delete a task use case', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new DeleteTaskUseCase(tasksRepository)
  })

  it('should be able to delete a task', async () => {
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
    expect(tasksRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a non-existing task', async () => {
    await expect(() =>
      sut.execute({
        taskId: 'non-existing-task-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
