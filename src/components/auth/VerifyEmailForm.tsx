'use client'

import React, { useCallback, useEffect, useState } from 'react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Flex,
  Heading,
  Progress,
  useToast,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { handleVerifyEmail } from '@/actions/verify-email'

const VerifyEmailForm = () => {
  const [error, setError] = useState('')
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const toast = useToast()

  const onSubmit = useCallback(async () => {
    try {
      if (!token) {
        toast({
          status: 'error',
          description: 'Token no encontrado',
        })
        throw new Error('Token no encontrado')
      }

      const response = await handleVerifyEmail(token)

      if (!response.success) {
        throw new Error(response.message)
      }

      toast({
        status: 'success',
        description: 'Correo electrónico verificado',
      })
    } catch (error: any) {
      console.error('error', error.message)
      toast({
        status: 'error',
        description: error.message,
      })
      setError(error.message)
    }
  }, [toast, token])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <Flex flexDirection="column" gap={4}>
      <Heading size="md">Verificando correo electrónico 📬</Heading>

      {error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <Box>
          <Progress colorScheme="blue" size="xs" isIndeterminate />
        </Box>
      )}

      <Button as={Link} href="/auth/login">
        Volver al inicio de sesión
      </Button>
    </Flex>
  )
}

export default VerifyEmailForm
