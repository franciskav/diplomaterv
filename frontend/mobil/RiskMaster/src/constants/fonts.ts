import {SizeHelper} from '../utility/helpers/sizeHelper'

export const fonts = {
  regular: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  bold: 'Roboto-Bold',
}

// majd a méreteket a rendes design után át kell írni
export const fontSizes = {
  title: SizeHelper.normalize(18),
  smallTitle: SizeHelper.normalize(16),
  button: SizeHelper.normalize(14),
  textInput: SizeHelper.normalize(15),
  label: SizeHelper.normalize(12),
  extraSmall: SizeHelper.normalize(10),
  small: SizeHelper.normalize(12),
  normal: SizeHelper.normalize(13),
  medium: SizeHelper.normalize(14),
  big: SizeHelper.normalize(15),
  tabLabel: SizeHelper.normalize(9),
  large: SizeHelper.normalize(20),
  extraLarge: SizeHelper.normalize(22),
}
