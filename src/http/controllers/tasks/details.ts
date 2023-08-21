import { FastifyReply, FastifyRequest } from 'fastify'
import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetTaskUseCase } from '@/use-cases/factories/make-get-task-use-case'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const detailsParamsSchema = z.object({
    taskId: z.string().refine((value) => {
      return isValidObjectId(value)
    }),
  })

  const { taskId } = detailsParamsSchema.parse(request.params)

  try {
    const useCase = makeGetTaskUseCase()

    const { task } = await useCase.execute({
      taskId,
    })

    return {
      task,
    }
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    throw error
  }
}
