import React, { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'

import Modal from '../../components/shared/Modal'

const meta: Meta<typeof Modal> = {
  component: Modal,
}

export default meta
type Story = StoryObj<typeof Modal>

/*
 * Example Modal story with React Hooks.
 * See note below related to this example.
 */
const ButtonWithHooks = () => {
  // Sets the hooks for both the label and primary props
  const [value, setValue] = useState('Secondary')
  const [isPrimary, setIsPrimary] = useState(false)

  // Sets a click handler to change the label's value
  const handleOnChange = () => {
    if (!isPrimary) {
      setIsPrimary(true)
      setValue('Primary')
    }
  }
  return <Modal isOpen onClose={() => {}} />
}

export const Primary: Story = {
  render: () => <ButtonWithHooks />,
}
