import { extendTheme } from '@chakra-ui/react'

import fonts from '../fonts'

import { buttonTheme } from './buttonTheme'
import { menuTheme } from './menuTheme'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  fonts: {
    heading: fonts.raleway.style.fontFamily,
    body: fonts.roboto.style.fontFamily,
  },
  components: { Button: buttonTheme, Menu: menuTheme },
})

export default theme
