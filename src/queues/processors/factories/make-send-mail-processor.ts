import { FakeMailProvider } from '@/providers/implementations/fake-mail-provider'

import { SendMailProcessor } from '../send-mail'

export function makeSendMailProcessor() {
  // const isProduction = env.NODE_ENV === 'production'
  // const mailProvider = isProduction ? new ExampleProductionMailProvider() : new FakeMailProvider()
  const mailProvider = new FakeMailProvider()
  const processor = new SendMailProcessor(mailProvider)

  return processor
}
