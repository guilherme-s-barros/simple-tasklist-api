import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-tasks-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { CreateTaskUseCase } from './create-task'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let tasksRepository: InMemoryTasksRepository
let usersRepository: InMemoryUsersRepository

let sut: CreateTaskUseCase

describe('Create task use case', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    usersRepository = new InMemoryUsersRepository()

    sut = new CreateTaskUseCase(tasksRepository, usersRepository)
  })

  it('should be able to create a task', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: '123456',
    })

    const { task } = await sut.execute({
      title: 'task example',
      description: 'description example',
      dueDate: new Date(),
      userId: user.id,
    })

    expect(task.id).toEqual(expect.any(String))
  })

  it('should not be able to create a task with a non-existent user id', async () => {
    await expect(() =>
      sut.execute({
        title: 'task example',
        description: 'description example',
        dueDate: new Date(),
        userId: 'non-existent-user-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
