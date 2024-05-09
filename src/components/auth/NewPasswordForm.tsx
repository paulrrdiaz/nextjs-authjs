'use client'

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Flex, Heading, Link, useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'

import { handleNewPassword } from '@/actions/new-password'
import { NewPasswordFormSchema, TNewPasswordFormSchema } from '@/lib/schemas'
import { AUTH_ROUTES } from '@/routes'

import InputControl from '../form/InputControl'

const NewPasswordForm = () => {
  const toast = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<TNewPasswordFormSchema>({
    resolver: zodResolver(NewPasswordFormSchema),
  })

  const onSubmit: SubmitHandler<TNewPasswordFormSchema> = async (data) => {
    try {
      const response = await handleNewPassword(data, token)

      if (response?.success) {
        reset()
        toast({
          description: response.message,
        })
        router.push(AUTH_ROUTES.LOGIN)
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
      <Heading size="md">
        Perdiste tu contraseña? <br /> No te preocupes, te ayudaremos. 🔑
      </Heading>

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
        Crear nueva contraseña
      </Button>

      <Button
        w="full"
        variant="link"
        as={Link}
        href={AUTH_ROUTES.LOGIN}
        size="xs"
      >
        Regresar al inicio de sesión
      </Button>
    </Flex>
  )
}

export default NewPasswordForm
