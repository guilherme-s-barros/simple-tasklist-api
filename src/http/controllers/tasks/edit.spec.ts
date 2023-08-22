import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { Task } from '@/models/task'
import { User } from '@/models/user'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Edit task (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to edit a task', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await User.findOne()

    const createdTask = await Task.create({
      title: 'To-do 1',
      description: null,
      dueDate: null,
      userId: user?.id,
    })

    const response = await request(app.server)
      .put(`/tasks/${createdTask.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated to-do title',
        description: 'Updated to-do description',
        dueDate: new Date(),
      })

    const task = await Task.findOne()

    expect(response.statusCode).toEqual(204)
    expect(task).toEqual(
      expect.objectContaining({
        title: 'Updated to-do title',
        description: 'Updated to-do description',
        dueDate: expect.any(Date),
      }),
    )
  })
})
