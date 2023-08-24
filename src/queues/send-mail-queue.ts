import Queue from 'bull'

import { env } from '@/env'

import { makeSendMailProcessor } from './processors/factories/make-send-mail-processor'

export const sendMailQueue = new Queue('send-mail', env.REDIS_URL)

const sendMailProcessor = makeSendMailProcessor()

sendMailQueue.process(sendMailProcessor.process)
