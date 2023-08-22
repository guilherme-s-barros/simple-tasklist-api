import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Fetch tasks (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch user tasks', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'To-do 1',
        description: 'to-do description',
        dueDate: new Date(),
      })

    const response = await request(app.server)
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.tasks).toEqual([
      expect.objectContaining({
        _id: expect.any(String),
      }),
    ])
  })
})
