import React, { ReactNode } from 'react'
import { useController } from 'react-hook-form'
import { Input, InputProps } from '@chakra-ui/react'

import FormControl, { BaseProps } from './FormControl'

export interface InputControlProps extends BaseProps {
  inputProps?: InputProps
  leftAddon?: ReactNode
  rightAddon?: ReactNode
  leftElement?: ReactNode
  rightElement?: ReactNode
}

const InputControl = (props: InputControlProps) => {
  const {
    name,
    control,
    label,
    inputProps,
    leftAddon,
    rightAddon,
    leftElement,
    rightElement,
    ...rest
  } = props
  const {
    field,
    formState: { isSubmitting },
  } = useController({
    name,
    control,
    defaultValue: inputProps?.defaultValue || '',
  })

  return (
    <FormControl name={name} control={control} label={label} {...rest}>
      <Input
        minW="320px"
        {...field}
        id={name}
        isDisabled={isSubmitting}
        {...inputProps}
        value={field.value ?? ''}
      />
    </FormControl>
  )
}

export default InputControl
