'use client'

import React from 'react'
import {
  Flex,
  Heading,
  Icon,
  Link,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react'
import { usePathname } from 'next/navigation'

import { DashboardIcon, PeopleIcon, SettingsIcon } from '@/lib/utils/icons'
import { DASHBOARD_ROUTES } from '@/routes'

const NAVIGATION_ITEMS = [
  {
    icon: DashboardIcon,
    label: 'Dashboard',
    path: DASHBOARD_ROUTES.INDEX,
  },
  {
    icon: PeopleIcon,
    label: 'Users',
    path: DASHBOARD_ROUTES.USERS,
  },
  {
    icon: SettingsIcon,
    label: 'Settings',
    path: DASHBOARD_ROUTES.SETTINGS,
  },
]

const Navigation = () => {
  const pathname = usePathname()

  return (
    <Flex
      p={4}
      pr={0}
      as="aside"
      backgroundColor="green.500"
      w={60}
      flexDirection="column"
      gap={6}
    >
      <Heading
        fontSize="md"
        letterSpacing={1}
        fontWeight="bold"
        color="white"
        as="h1"
      >
        nextjs-authjs
      </Heading>

      <List as="nav" color="white" display="flex" flexDirection="column">
        {NAVIGATION_ITEMS.map((item) => {
          const isSelected = pathname === item.path
          return (
            <ListItem
              key={item.label}
              as={Link}
              href={item.path}
              {...(isSelected && { pointerEvents: 'none', fontWeight: 'bold' })}
              _hover={{
                textDecoration: 'none',
                backgroundColor: 'green.600',
              }}
              color={isSelected ? 'green.500' : 'white'}
              backgroundColor={isSelected ? 'white' : 'transparent'}
              display="flex"
              gap={2}
              alignItems="center"
              justifyContent="flex-start"
              py={2}
              px={4}
              roundedLeft="full"
              roundedRight={0}
            >
              <Icon as={item.icon} fontSize="xl" />
              <Text fontSize="md" as="span">
                {item.label}
              </Text>
            </ListItem>
          )
        })}
      </List>
    </Flex>
  )
}

export default Navigation
