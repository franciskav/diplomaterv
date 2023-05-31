import {StyleSheet} from 'react-native'
import {colors} from './colors'
import {fonts, fontSizes} from './fonts'

export const textStyle = StyleSheet.create({
  title: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.title,
    color: colors.text.primary,
  },
})
