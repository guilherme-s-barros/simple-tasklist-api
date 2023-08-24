export interface SendMailParams {
  subject: string
  to: string
  body: string
}

export interface MailProvider {
  sendMail(params: SendMailParams): Promise<void>
}
