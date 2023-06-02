export interface Colors {
  background: string
  white: string
  primary: string
  primaryLight: string
  secondary: string
  error: string
  divider: string
  shadow: string
  text: {
    primary: string
    light: string
    accent: string
  }
}

export const colors: Colors = {
  background: '#FAFDF6',
  white: '#FFFFFF',
  primary: '#127475',
  primaryLight: '#0E9594',
  secondary: '#E56138', //EE964B
  error: '#DE1A1A',
  divider: '#A3A3A3',
  shadow: '#11111111',
  text: {
    primary: '#080F0F',
    light: '#A3A3A3',
    accent: '#E56138',
  },
}

export const darkColors: Colors = {
  background: '#FAFDF6',
  white: '#FFFFFF',
  primary: '#127475',
  primaryLight: '#0E9594',
  secondary: '#E56138',
  error: '#DE1A1A',
  divider: '#A3A3A3',
  shadow: '#11111111',
  text: {
    primary: '#080F0F',
    light: '#A3A3A3',
    accent: '#E56138',
  },
}
