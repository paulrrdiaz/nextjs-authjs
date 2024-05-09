'use client'

import React, { PropsWithChildren } from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import theme from './theme'

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <ChakraProvider
      toastOptions={{ defaultOptions: { position: 'top', duration: 6000 } }}
      theme={theme}
    >
      {children}
    </ChakraProvider>
  )
}

export default Provider
