import { FastifyReply, FastifyRequest } from 'fastify'
import { isValidObjectId } from 'mongoose'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeDeleteTaskUseCase } from '@/use-cases/factories/make-delete-task-use-case'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const removeParamsSchema = z.object({
    taskId: z.string().refine((value) => {
      return isValidObjectId(value)
    }),
  })

  const { taskId } = removeParamsSchema.parse(request.params)

  try {
    const useCase = makeDeleteTaskUseCase()

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
