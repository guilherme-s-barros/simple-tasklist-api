import { FastifyReply, FastifyRequest } from 'fastify'
import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeToggleCompletedUseCase } from '@/use-cases/factories/make-toggle-completed-use-case'

export async function completed(request: FastifyRequest, reply: FastifyReply) {
  const completedParamsSchema = z.object({
    taskId: z.string().refine((value) => {
      return isValidObjectId(value)
    }, 'Invalid ObjectID'),
  })

  const { taskId } = completedParamsSchema.parse(request.params)

  try {
    const useCase = makeToggleCompletedUseCase()

    await useCase.execute({
      taskId,
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
