import React from 'react'
import { Flex } from '@chakra-ui/react'

import UserAvatar from '@/components/UserAvatar'

const Header = () => {
  return (
    <Flex h={14} as="header" px={4}>
      <Flex flex={1}></Flex>

      <Flex alignItems="center">
        <UserAvatar />
      </Flex>
    </Flex>
  )
}

export default Header
