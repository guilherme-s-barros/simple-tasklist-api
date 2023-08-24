import { FakeMailProvider } from '@/providers/implementations/fake-mail-provider'

import { SendMailProcessor } from '../send-mail'

export function makeSendMailProcessor() {
  const mailProvider = new FakeMailProvider()
  const processor = new SendMailProcessor(mailProvider)

  return processor
}
