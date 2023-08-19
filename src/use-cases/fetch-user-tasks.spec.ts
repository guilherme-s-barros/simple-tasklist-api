import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-tasks-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { FetchUserTasksUseCase } from './fetch-user-tasks'

let tasksRepository: InMemoryTasksRepository
let usersRepository: InMemoryUsersRepository

let sut: FetchUserTasksUseCase

describe('Fetch user tasks use case', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    usersRepository = new InMemoryUsersRepository()

    sut = new FetchUserTasksUseCase(tasksRepository)
  })

  it('should be able to fetch user tasks', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: '123456',
    })

    await tasksRepository.create({
      title: 'title example',
      userId: user.id,
    })

    const { tasks } = await sut.execute({
      userId: user.id,
    })

    expect(tasks).toEqual([
      expect.objectContaining({
        title: 'title example',
      }),
    ])
  })
})
