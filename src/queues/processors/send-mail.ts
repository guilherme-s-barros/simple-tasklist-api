import { Job } from 'bull'

import { MailProvider } from '@/providers/mail-provider'

export class SendMailProcessor {
  constructor(private readonly mailProvider: MailProvider) {}

  async process(job: Job) {
    await this.mailProvider.sendMail({
      to: job.data.email,
      subject: 'seja bem-vindo(a)!',
      body: `Olá, ${job.data.name}, \n\ncadastro realizado com sucesso.`,
    })
  }
}
