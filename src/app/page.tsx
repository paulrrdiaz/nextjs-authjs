import React from 'react'
import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import Link from 'next/link'

const HomePage = () => {
  return (
    <Flex
      position="relative"
      minH="100vh"
      justifyContent="center"
      alignItems="center"
      bgColor="green.50"
    >
      <Flex
        position="relative"
        flexDirection="column"
        gap={4}
        p={8}
        backgroundColor="rgba(0, 0, 0, 0.3)"
        rounded="lg"
      >
        <Heading color="white">Welcome to Home Page</Heading>

        <Flex gap={2} justifyContent="center">
          <Link href="/auth/login" passHref prefetch>
            <Button>Log In</Button>
          </Link>
          <Link href="/auth/register" passHref prefetch>
            <Button>Sign up</Button>
          </Link>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default HomePage
