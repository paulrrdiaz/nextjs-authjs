import React, { Suspense } from 'react'
import { Spinner } from '@chakra-ui/react'

import LoginForm from '@/components/auth/LoginForm'

const LoginPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <LoginForm />
    </Suspense>
  )
}

export default LoginPage
