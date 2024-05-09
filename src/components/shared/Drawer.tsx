import React, { PropsWithChildren, useEffect, useRef } from 'react'
import {
  Button,
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useDisclosure,
} from '@chakra-ui/react'

type DrawerProps = PropsWithChildren & {
  header: React.ReactNode
  trigger: React.ReactNode
  submitButton?: React.ReactNode
  shouldClose?: boolean
}

const Drawer = (props: DrawerProps) => {
  const { header, trigger, submitButton, shouldClose, children } = props
  const { isOpen, onClose, onOpen } = useDisclosure()
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (shouldClose) {
      onClose()
    }
  }, [shouldClose, onClose])

  return (
    <>
      {React.cloneElement(trigger as React.ReactElement, {
        ref: buttonRef,
        onClick: onOpen,
      })}

      <ChakraDrawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={buttonRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          {header && <DrawerHeader>{header}</DrawerHeader>}

          <DrawerBody>{children}</DrawerBody>

          <DrawerFooter as={Flex} gap={2}>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>

            {submitButton}
          </DrawerFooter>
        </DrawerContent>
      </ChakraDrawer>
    </>
  )
}

export default Drawer
