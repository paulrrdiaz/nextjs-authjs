import React, { PropsWithChildren } from 'react'
import { Divider, Flex } from '@chakra-ui/react'
import { SessionProvider } from 'next-auth/react'

import { auth } from '@/auth'
import Header from '@/layouts/protected/Header'
import Navigation from '@/layouts/protected/Navigation'

const ProtectedLayout = async (props: PropsWithChildren) => {
  const { children } = props
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <Flex minH="100vh">
        <Navigation />

        <Flex flex={1} flexDirection="column">
          <Header />
          <Divider />
          <Flex as="main" p={8}>
            {children}
          </Flex>
        </Flex>
      </Flex>
    </SessionProvider>
  )
}

export default ProtectedLayout
