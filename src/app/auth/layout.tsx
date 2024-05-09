import React, { PropsWithChildren } from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Velustro } from 'uvcanvas'

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <Flex
      position="relative"
      minH="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        position="absolute"
        inset={0}
        overflow="hidden"
        sx={{
          '& canvas': {
            height: '100vh',
          },
        }}
      >
        <Velustro />
      </Box>

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
