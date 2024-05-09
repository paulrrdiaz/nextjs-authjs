import React from 'react'
import { Flex, FlexProps } from '@chakra-ui/react'

const Emptiness = (props: FlexProps) => {
  const { children, ...rest } = props

  return (
    <Flex
      w="full"
      p={10}
      minH={64}
      backgroundColor="gray.50"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      shadow="sm"
      rounded="md"
      color="gray.400"
      fontSize="sm"
      letterSpacing={1}
      {...rest}
    >
      {children}
    </Flex>
  )
}

export default Emptiness
