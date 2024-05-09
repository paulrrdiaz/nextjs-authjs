import React from 'react'
import { useController } from 'react-hook-form'
import { Select, SelectProps } from '@chakra-ui/react'

import FormControl, { BaseProps } from './FormControl'

export interface SelectControlProps extends BaseProps {
  selectProps?: SelectProps
  children: React.ReactNode
}

const SelectControl = (props: SelectControlProps) => {
  const { name, control, label, selectProps, children, ...rest } = props
  const {
    field,
    formState: { isSubmitting },
  } = useController({
    name,
    control,
    defaultValue: selectProps?.defaultValue || '',
  })

  return (
    <FormControl name={name} control={control} label={label} {...rest}>
      <Select
        {...field}
        id={name}
        isDisabled={isSubmitting}
        minW="320px"
        {...selectProps}
      >
        {children}
      </Select>
    </FormControl>
  )
}

export default SelectControl
