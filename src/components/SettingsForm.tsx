'use client'

import React, { useMemo } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Box, Button, Flex, Heading, useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserRole } from '@prisma/client'
import { pick } from 'lodash'
import { useSession } from 'next-auth/react'

import { handleUpdateSettings } from '@/actions/settings'
import InputControl from '@/components/form/InputControl'
import useCurrentUser from '@/hooks/useCurrentUser'
import { SettingsFormSchema, TSettingsFormSchema } from '@/lib/schemas'
import { getObjectDiff } from '@/lib/utils/lodash'

import SelectControl from './form/SelectControl'

const SettingsForm = () => {
  const toast = useToast()
  const { update } = useSession()
  const currentUser = useCurrentUser()
  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name ?? '',
      email: currentUser?.email ?? '',
      role: currentUser?.role ?? 'USER',
      password: '',
      newPassword: '',
    }),
    [currentUser],
  )
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<TSettingsFormSchema>({
    resolver: zodResolver(SettingsFormSchema),
    defaultValues,
  })

  const onSubmit: SubmitHandler<TSettingsFormSchema> = async (data) => {
    try {
      const diff = getObjectDiff(defaultValues, data)
      await handleUpdateSettings(pick(data, diff))
      update()
      toast({
        status: 'success',
        description: 'Settings updated',
      })
      reset()
    } catch (error: any) {
      console.log('error', error)
      toast({
        status: 'error',
        description: error?.message,
      })
    }
  }

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      flexDirection="column"
      gap={4}
    >
      <Heading size="md">Settings</Heading>

      <InputControl
        control={control}
        name="name"
        inputProps={{
          placeholder: 'Ej. Jon Snow',
        }}
        label="Full name"
      />

      <InputControl
        control={control}
        name="email"
        inputProps={{
          placeholder: 'Ej. jon.snow@winterfell.com',
        }}
        label="Correo electrónico"
      />

      <SelectControl control={control} name="role" label="Role">
        {Object.keys(UserRole).map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </SelectControl>

      <InputControl
        control={control}
        name="password"
        inputProps={{
          type: 'password',
          placeholder: 'Ej. l1ttl3s3cr3t',
        }}
        label="Contraseña actual"
      />

      <InputControl
        control={control}
        name="newPassword"
        inputProps={{
          type: 'password',
          placeholder: 'Ej. n3ws3cr3t',
        }}
        label="Nueva Contraseña"
      />

      <Box>
        <Button isLoading={isSubmitting} type="submit">
          Actualizar información
        </Button>
      </Box>
    </Flex>
  )
}

export default SettingsForm
