import { hash } from 'bcryptjs'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { User } from '@/models/user'

describe('Refresh token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh a token', async () => {
    await User.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      passwordHash: await hash('123456', 6),
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const cookie = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookie)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.token).toEqual(expect.any(String))
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
