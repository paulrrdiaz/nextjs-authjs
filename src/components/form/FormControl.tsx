import { ReactNode } from 'react'
import { Control, get, useController } from 'react-hook-form'
import {
  FormControl as ChakraFormControl,
  FormControlProps,
  FormErrorMessage,
  FormErrorMessageProps,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Icon,
  TextProps,
  Tooltip,
  TooltipProps,
} from '@chakra-ui/react'

import { InfoIcon } from '@/lib/utils/icons'

export interface ChakraFormControlProps
  extends Omit<FormControlProps, 'label'> {}

export interface BaseReactHookFormProps {
  name: string
  control?: Control<any, any>
  label?: ReactNode
  labelProps?: FormLabelProps
  helperText?: ReactNode
  helperTextProps?: TextProps
  errorMessageProps?: FormErrorMessageProps
  tooltipText?: string
  tooltipProps?: TooltipProps
}

export interface BaseProps
  extends ChakraFormControlProps,
    BaseReactHookFormProps {}

export const FormControl = (props: BaseProps) => {
  const {
    children,
    name,
    control,
    label,
    labelProps,
    helperText,
    helperTextProps,
    tooltipText,
    tooltipProps,
    errorMessageProps,
    ...rest
  } = props

  const {
    formState: { errors },
  } = useController({ name, control })
  const error = get(errors, name, '') as any
  const hasError = Boolean(error?.message)

  return (
    <ChakraFormControl isInvalid={hasError} {...rest}>
      {label && typeof label === 'string' ? (
        <FormLabel
          color={hasError ? 'red' : 'gray.600'}
          fontWeight="700"
          fontSize="xs"
          m={0}
          htmlFor={name}
          {...labelProps}
        >
          {label}{' '}
          {tooltipText && (
            <Tooltip
              label={tooltipText}
              placement="right"
              aria-label={`Tooltip for form field ${name}`}
              {...tooltipProps}
            >
              <Icon as={InfoIcon} />
            </Tooltip>
          )}
        </FormLabel>
      ) : (
        label
      )}

      {children}

      <FormErrorMessage letterSpacing={0.8} mt={1} {...errorMessageProps}>
        {error.message}
      </FormErrorMessage>

      {helperText && typeof helperText === 'string' ? (
        <FormHelperText
          mt={1}
          fontStyle="italic"
          fontSize="xs"
          fontWeight="300"
          {...helperTextProps}
        >
          {helperText}
        </FormHelperText>
      ) : (
        helperText
      )}
    </ChakraFormControl>
  )
}

export default FormControl
