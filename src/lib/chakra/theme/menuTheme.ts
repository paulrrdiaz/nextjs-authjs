import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys)

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  button: {},
  list: {
    py: '0',
    borderRadius: 'xl',
    borderColor: 'green.300',
  },
  item: {
    color: 'gray.700',

    _first: {
      borderTopRadius: 'xl',
    },
    _last: {
      borderBottomRadius: 'xl',
    },
  },
  groupTitle: {
    // this will style the text defined by the title prop
    // in the MenuGroup and MenuOptionGroup components
    textTransform: 'uppercase',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 'wider',
    opacity: '0.7',
  },
  command: {
    // this will style the text defined by the command
    // prop in the MenuItem and MenuItemOption components
    opacity: '0.8',
    fontFamily: 'mono',
    fontSize: 'sm',
    letterSpacing: 'tighter',
    pl: '4',
  },
  divider: {
    my: 0,
    borderColor: 'green.300',
  },
})
// export the base styles in the component theme
export const menuTheme = defineMultiStyleConfig({ baseStyle })
