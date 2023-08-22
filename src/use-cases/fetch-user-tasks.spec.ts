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
      title: 'to-do 1',
      userId: user.id,
      description: 'to-do description',
      dueDate: new Date(),
    })

    const { tasks } = await sut.execute({
      userId: user.id,
      page: 1,
    })

    expect(tasks).toEqual([
      expect.objectContaining({
        title: 'to-do 1',
      }),
    ])
  })

  it('should be able to fetch paginated user tasks', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: '123456',
    })

    for (let i = 1; i <= 22; i++) {
      await tasksRepository.create({
        title: `to-do ${i}`,
        userId: user.id,
        description: 'to-do description',
        dueDate: new Date(),
      })
    }

    const { tasks } = await sut.execute({
      userId: user.id,
      page: 2,
    })

    expect(tasks).toEqual([
      expect.objectContaining({ title: 'to-do 21' }),
      expect.objectContaining({ title: 'to-do 22' }),
    ])
  })
})
