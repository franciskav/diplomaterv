import {useTheme} from '@react-navigation/native'
import {colors, Colors, darkColors} from '../constants/colors'

export const useColors = (): Colors => {
  const {dark} = useTheme()
  return dark ? darkColors : colors
}
