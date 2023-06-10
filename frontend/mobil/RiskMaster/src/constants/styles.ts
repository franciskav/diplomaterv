import {StyleSheet} from 'react-native'
import {colors} from './colors'
import {fonts, fontSizes} from './fonts'

export const textStyle = StyleSheet.create({
  title: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.title,
    color: colors.text.primary,
  },
  smallTitle: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.smallTitle,
    color: colors.text.primary,
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.label,
    color: colors.text.light,
  },
  labelSecondary: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.label,
    color: colors.text.primary,
  },
  placeholder: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.medium,
    color: colors.text.light,
  },
  textInput: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.medium,
    color: colors.text.primary,
  },
  error: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.label,
    color: colors.error,
  },
  medium: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.medium,
    color: colors.text.primary,
  },
  mediumBold: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.medium,
    color: colors.text.primary,
  },
  button: {
    fontFamily: fonts.bold,
    fontSize: fontSizes.button,
    color: colors.text.primary,
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.normal,
    color: colors.text.primary,
  },
  small: {
    fontFamily: fonts.regular,
    fontSize: fontSizes.label,
    color: colors.text.primary,
  },
  center: {
    textAlign: 'center',
  },
})
