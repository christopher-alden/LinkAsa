import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'



// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: [
      'suisse',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#0C5494',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
})

export default theme
