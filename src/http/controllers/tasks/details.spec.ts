import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { Task } from '@/models/task'
import { User } from '@/models/user'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Task details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able get a task details', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await User.findOne()

    const task = await Task.create({
      title: 'To-do 1',
      description: 'to-do description',
      dueDate: new Date(),
      userId: user?.id,
    })

    const response = await request(app.server)
      .get(`/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.task).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
      }),
    )
  })
})
