import {
  Transporter,
  createTestAccount,
  createTransport,
  getTestMessageUrl,
} from 'nodemailer'

import { MailProvider, SendMailParams } from '../mail-provider'

export class FakeMailProvider implements MailProvider {
  private transporter: Transporter

  constructor() {
    createTestAccount()
      .then((account) => {
        this.transporter = createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  async sendMail(params: SendMailParams) {
    const message = await this.transporter.sendMail({
      from: 'noreply <no-reply@amazingtodolist.com.br>',
      to: params.to,
      subject: params.subject,
      text: params.body,
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', getTestMessageUrl(message))
  }
}
