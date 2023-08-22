import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { Task } from '@/models/task'
import { User } from '@/models/user'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Delete task (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete a task', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await User.findOne()

    const task = await Task.create({
      title: 'To-do 1',
      description: 'to-do description',
      dueDate: new Date(),
      userId: user?.id,
    })

    const response = await request(app.server)
      .delete(`/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    const tasks = await Task.find()

    expect(response.statusCode).toEqual(204)
    expect(tasks).toHaveLength(0)
  })
})
