import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Colors} from '../../constants/colors'
import {margins} from '../../constants/margins'
import {spaces} from '../../constants/spaces'
import {useColors} from '../../hook/colorsHook'
import {ButtonProps, CustomButton} from '../buttons/button'

interface BottomCardProps {
  button1: ButtonProps
  button2?: ButtonProps
  safeArea?: boolean
  style?: StyleProp<ViewStyle>
  disabled?: boolean
  header?: React.ReactNode
}

export const BottomCard = (props: BottomCardProps) => {
  const colors = useColors()
  const styles = createStyles(colors)
  const safeAreaInsets = useSafeAreaInsets()

  const paddingBottom =
    props.safeArea && safeAreaInsets.bottom > spaces.medium
      ? safeAreaInsets.bottom
      : spaces.medium

  const opacity = props.disabled ? 0.5 : 1.0

  return (
    <View style={styles.container}>
      {props.header}
      <View
        style={[styles.row, {paddingBottom: paddingBottom, opacity: opacity}]}>
        <CustomButton
          {...props.button1}
          style={styles.flex1}
          disabled={props.disabled ?? props.button1.disabled}
        />
        {props.button2 && (
          <CustomButton
            {...props.button2}
            style={[styles.flex1, margins.mlMedium]}
            disabled={props.disabled ?? props.button2?.disabled}
          />
        )}
      </View>
    </View>
  )
}

const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
      paddingHorizontal: spaces.contentHorizontal,
      paddingTop: spaces.medium,
      elevation: 3,
      shadowRadius: 10,
      shadowOpacity: 1,
      shadowColor: colors.shadow,
    },
    row: {
      flexDirection: 'row',
    },
    flex1: {
      flex: 1,
    },
  })

  return styles
}
