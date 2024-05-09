import React from 'react'
import {
  Button,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'

type ModalProps = {
  onClose: () => void
  isOpen: boolean
}

const Modal = (props: ModalProps) => {
  const { isOpen = true, onClose } = props

  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. In quae
          similique nostrum mollitia magni quas soluta culpa error est, quisquam
          recusandae excepturi, cupiditate vitae! Possimus reiciendis quam
          impedit assumenda sed?
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  )
}

export default Modal
