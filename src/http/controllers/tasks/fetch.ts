import { FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchUserTasksUseCase } from '@/use-cases/factories/make-fetch-user-tasks-use-case'

export async function fetch(request: FastifyRequest) {
  const fetchQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = fetchQuerySchema.parse(request.query)

  const useCase = makeFetchUserTasksUseCase()

  const { tasks } = await useCase.execute({
    userId: request.user.sub,
    page,
  })

  return {
    tasks,
  }
}
