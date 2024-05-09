'use client'

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Flex, Heading, useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { handleRegister } from '@/actions/register'
import InputControl from '@/components/form/InputControl'
import { RegisterFormSchema, TRegisterFormSchema } from '@/lib/schemas'
import { AUTH_ROUTES } from '@/routes'

const RegisterForm = () => {
  const toast = useToast()
  const router = useRouter()
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<TRegisterFormSchema>({
    resolver: zodResolver(RegisterFormSchema),
  })

  const onSubmit: SubmitHandler<TRegisterFormSchema> = async (data) => {
    try {
      const response = await handleRegister(data)

      if (response?.success) {
        router.push(AUTH_ROUTES.LOGIN)
        reset()
        toast({
          description: response.message,
        })
      }
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
      <Heading size="lg">Listo para comenzar? 🏠</Heading>

      <InputControl
        control={control}
        inputProps={{
          placeholder: 'Ej. Jon Snow',
          isDisabled: isSubmitting,
        }}
        name="name"
        label="Nombre completo"
        helperText="Jamás compartiremos tus datos personales."
      />

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

      <Button w="full" isLoading={isSubmitting} type="submit">
        Registrarse
      </Button>

      <Button
        w="full"
        variant="link"
        as={Link}
        href={AUTH_ROUTES.LOGIN}
        size="xs"
      >
        Ya tienes una cuenta? Ingresa aquí
      </Button>
    </Flex>
  )
}

export default RegisterForm
