import React, { Suspense } from 'react'
import { Spinner } from '@chakra-ui/react'

import NewPasswordForm from '@/components/auth/NewPasswordForm'

const NewPasswordPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <NewPasswordForm />
    </Suspense>
  )
}

export default NewPasswordPage
