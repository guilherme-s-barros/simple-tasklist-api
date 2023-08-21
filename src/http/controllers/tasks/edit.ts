import { FastifyReply, FastifyRequest } from 'fastify'
import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeEditTaskUseCase } from '@/use-cases/factories/make-edit-task-use-case'

export async function edit(request: FastifyRequest, reply: FastifyReply) {
  const editParamsSchema = z.object({
    taskId: z.string().refine((value) => {
      return isValidObjectId(value)
    }, 'Invalid ObjectID'),
  })

  const editBodySchema = z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty().nullable(),
    dueDate: z.coerce.date().nullable(),
  })

  const { taskId } = editParamsSchema.parse(request.params)
  const { title, description, dueDate } = editBodySchema.parse(request.body)

  try {
    const useCase = makeEditTaskUseCase()

    await useCase.execute({
      taskId,
      title,
      description,
      dueDate,
    })

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    throw error
  }
}
