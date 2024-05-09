import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendForgotPasswordEmail = async (email: string, token: string) => {
  const newPasswordLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/new-password?token=${token}`
  const message = {
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Recupera tu contraseña',
    html: `<p>Dale click <a href="${newPasswordLink}">aquí<a> para comenzar con el proceso de recuperación de contraseña<p>`,
  }

  await resend.emails.send(message)
}

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email?token=${token}`
  const message = {
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Verifica tu correo electrónico',
    html: `<p>Dale click <a href="${confirmLink}">aquí<a> para verificar tu correo electrónico<p>`,
  }

  await resend.emails.send(message)
}
