import React from 'react'
import { useForm } from 'react-hook-form'
import { Button, Flex, Input } from '@chakra-ui/react'
import { Meta, StoryObj } from '@storybook/react'

import sleep from '@/lib/utils/sleep'

import Drawer from '../../components/shared/Drawer'

const meta: Meta<typeof Drawer> = {
  component: Drawer,
}

export default meta
type Story = StoryObj<typeof Drawer>

const DrawerWithForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful, isSubmitting },
  } = useForm()
  const onSubmit = async (data: any) => {
    try {
      await sleep(2000)
      console.log(data)
      reset()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Drawer
      submitButton={
        <Button isLoading={isSubmitting} form="drawer-form" type="submit">
          Submit
        </Button>
      }
      header="Drawer Story"
      trigger={<Button>Open drawer</Button>}
      shouldClose={isSubmitSuccessful}
    >
      <Flex
        flexDirection="column"
        gap={2}
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        id="drawer-form"
      >
        <Input {...register('name')} placeholder="Name" />
        <Input {...register('email')} placeholder="Email" />
      </Flex>
    </Drawer>
  )
}

export const Primary: Story = {
  render: () => <DrawerWithForm />,
}
