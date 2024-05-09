import React, { PropsWithChildren } from 'react'
import { Box, Flex } from '@chakra-ui/react'

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      position="relative"
      minH="100vh"
      justifyContent="center"
      alignItems="center"
      bgColor="green.50"
    >
      <Box
        position="relative"
        gap={4}
        p={8}
        backgroundColor="white"
        rounded="lg"
        shadow="md"
      >
        {children}
      </Box>
    </Flex>
  )
}

export default AuthLayout
