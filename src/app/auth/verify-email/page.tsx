import React, { Suspense } from 'react'
import { Spinner } from '@chakra-ui/react'

import VerifyEmailForm from '@/components/auth/VerifyEmailForm'

const VerifyEmailPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <VerifyEmailForm />
    </Suspense>
  )
}

export default VerifyEmailPage
