'use client'

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Box, Button, Flex, Heading, useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { handleLogin } from '@/actions/login'
import InputControl from '@/components/form/InputControl'
import { LoginFormSchema, TLoginFormSchema } from '@/lib/schemas'

const LoginForm = () => {
  const toast = useToast()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') ?? undefined
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<TLoginFormSchema>({
    resolver: zodResolver(LoginFormSchema),
  })

  const onSubmit: SubmitHandler<TLoginFormSchema> = async (data) => {
    try {
      await handleLogin(data, callbackUrl)

      reset()
      toast({
        description: 'Inicio de sesión exitoso.',
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
      <Heading size="lg">Hola de nuevo! 👋</Heading>

      <InputControl
        control={control}
        inputProps={{
          type: 'email',
          placeholder: 'Ej. jon.snow@winterfell.com',
          isDisabled: isSubmitting,
        }}
        name="email"
        label="Correo electrónico"
        helperText="Jamás compartiremos tu correo electrónico."
      />

      <InputControl
        control={control}
        inputProps={{
          type: 'password',
          placeholder: 'Ej. l1ttl3s3cr3t',
          isDisabled: isSubmitting,
        }}
        name="password"
        label="Contraseña"
        helperText="Jamás compartiremos tu contraseña."
      />

      <Box>
        <Button variant="link" as={Link} href="/auth/forgot-password" size="xs">
          Olvidaste tu contraseña?
        </Button>
      </Box>

      <Button w="full" type="submit" isLoading={isSubmitting}>
        Iniciar sesión
      </Button>

      <Button w="full" variant="link" as={Link} href="/auth/register" size="xs">
        No tienes cuenta? Regístrate aquí
      </Button>
    </Flex>
  )
}

export default LoginForm
