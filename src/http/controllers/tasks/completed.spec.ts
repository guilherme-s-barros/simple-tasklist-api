import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { Task } from '@/models/task'
import { User } from '@/models/user'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Task completed (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to check a task as completed', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await User.findOne()

    const createdTask = await Task.create({
      title: 'To-do 1',
      description: 'to-do description',
      dueDate: new Date(),
      userId: user?.id,
    })

    const response = await request(app.server)
      .patch(`/tasks/${createdTask.id}/completed`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    const task = await Task.findOne()

    expect(response.statusCode).toEqual(204)
    expect(task?.completed).toEqual(true)
  })
})
