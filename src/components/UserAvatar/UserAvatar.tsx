'use client'

import React from 'react'
import {
  Avatar,
  Badge,
  Flex,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { signOut } from 'next-auth/react'

import useCurrentUser from '@/hooks/useCurrentUser'
import { ChevronDownIcon } from '@/lib/utils/icons'

const UserAvatar = () => {
  const currentUser = useCurrentUser()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <Menu>
      <MenuButton backgroundColor="green.100" p={2} rounded="full">
        <Flex alignItems="center" gap={1}>
          <Avatar
            color="white"
            fontWeight="bold"
            backgroundColor="green.500"
            size="xs"
            {...(currentUser?.name && { name: currentUser.name })}
            {...(currentUser?.image && { src: currentUser.image })}
          />
          <Icon as={ChevronDownIcon} color="green.500" />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem
          display="flex"
          alignItems="flex-start"
          flexDirection="column"
          gap={0.5}
          backgroundColor="green.50"
          py={3}
        >
          <Heading size="sm" as="h4" lineHeight={1}>
            {currentUser?.name}
          </Heading>
          <Text fontSize="sm">{currentUser?.email}</Text>
          <Badge colorScheme="blue">{currentUser?.role}</Badge>
        </MenuItem>

        <MenuItem>Editar perfil</MenuItem>

        <MenuDivider />

        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default UserAvatar
