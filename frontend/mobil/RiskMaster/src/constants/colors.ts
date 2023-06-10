export interface Colors {
  background: string
  white: string
  black: string
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
  tab: {
    text: string
    backgroundActive: string
    backgroundInactive: string
  }
  rigkLevel: {
    zero: string
    one: string
    two: string
    three: string
    four: string
    five: string
  }
}

export const colors: Colors = {
  background: '#e6eeee',
  white: '#FFFFFF',
  black: '#000000',
  primary: '#127475',
  primaryLight: '#0E9594',
  secondary: '#E56138', //EE964B
  error: '#DE1A1A',
  divider: '#A3A3A3',
  shadow: '#11111155',
  text: {
    primary: '#080F0F',
    light: '#A3A3A3',
    accent: '#E56138',
  },
  tab: {
    text: '#080F0F',
    backgroundActive: '#FFFFFF',
    backgroundInactive: '#DDDDDD',
  },
  rigkLevel: {
    zero: '#A3A3A3',
    one: '#44D64C',
    two: '#85C7F2',
    three: '#FFE313',
    four: '#FF6700',
    five: '#DE1A1A',
  },
}

export const darkColors: Colors = {
  background: '#F2F6F6',
  white: '#FFFFFF',
  black: '#000000',
  primary: '#127475',
  primaryLight: '#0E9594',
  secondary: '#E56138',
  error: '#DE1A1A',
  divider: '#A3A3A3',
  shadow: '#11111155',
  text: {
    primary: '#080F0F',
    light: '#A3A3A3',
    accent: '#E56138',
  },
  tab: {
    text: '#080F0F',
    backgroundActive: '#FFFFFF',
    backgroundInactive: '#DDDDDD',
  },
  rigkLevel: {
    zero: '#A3A3A3',
    one: '#44D64C',
    two: '#85C7F2',
    three: '#FFE313',
    four: '#FF6700',
    five: '#DE1A1A',
  },
}
