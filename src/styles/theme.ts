export const theme = {
  colors: {
    primary: '#FF5733',
    secondary: '#33FF57',
    accent: '#5733FF',
    background: '#FFFFFF',
    text: '#000000',
    border: '#000000',
  },
  shadows: {
    brutal: '5px 5px 0px 0px #000000',
    brutalHover: '7px 7px 0px 0px #000000',
  },
  borderWidth: {
    brutal: '3px',
  },
  spacing: {
    brutal: '2rem',
  },
}

export const darkTheme = {
  ...theme,
  colors: {
    primary: '#FF5733',
    secondary: '#33FF57',
    accent: '#5733FF',
    background: '#121212',
    text: '#FFFFFF',
    border: '#FFFFFF',
  },
} 