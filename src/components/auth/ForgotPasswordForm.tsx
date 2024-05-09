'use client'

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Flex, Heading, Link, useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'

import { handleForgotPassword } from '@/actions/forgot-password'
import { ForgotFormSchema, TForgotFormSchema } from '@/lib/schemas'

import InputControl from '../form/InputControl'

const ForgotPasswordForm = () => {
  const toast = useToast()
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<TForgotFormSchema>({
    resolver: zodResolver(ForgotFormSchema),
  })

  const onSubmit: SubmitHandler<TForgotFormSchema> = async (data) => {
    try {
      await handleForgotPassword(data)

      reset()
      toast({
        description:
          'Revisa tu correo electrónico para restablecer tu contraseña.',
      })
    } catch (error: any) {
      console.error('error', error.message)
      toast({
        status: 'error',
        description: error.message,
      })
    }
  }

  return (
    <Flex
      flexDirection="column"
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      gap={4}
    >
      <Heading size="lg">¿Olvidaste tu contraseña? 😢</Heading>

      <InputControl
        control={control}
        inputProps={{
          type: 'email',
          placeholder: 'Ej. jon.snow@winterfell.com',
          isDisabled: isSubmitting,
        }}
        name="email"
        label="Correo electrónico"
        helperText="Te enviaremos un enlace para restablecer tu contraseña."
      />

      <Button w="full" type="submit" isLoading={isSubmitting}>
        Restablecer contraseña
      </Button>

      <Button w="full" variant="link" as={Link} href="/auth/login" size="xs">
        Regresar al inicio de sesión
      </Button>
    </Flex>
  )
}

export default ForgotPasswordForm
