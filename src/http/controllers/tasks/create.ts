import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeCreateTaskUseCase } from '@/use-cases/factories/make-create-task-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createTaskBodySchema = z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty().optional().nullable(),
    dueDate: z.coerce.date().optional().nullable(),
  })

  const { title, description, dueDate } = createTaskBodySchema.parse(
    request.body,
  )

  try {
    const useCase = makeCreateTaskUseCase()

    await useCase.execute({
      title,
      description,
      dueDate,
      userId: request.user.sub,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    throw error
  }
}
