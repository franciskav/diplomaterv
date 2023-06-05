import React from 'react'
import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import {Colors} from '../../constants/colors'
import {spaces} from '../../constants/spaces'
import {useColors} from '../../hook/colorsHook'

interface CardProps {
  style?: StyleProp<ViewStyle>
  children: React.ReactNode
  hideBorder?: boolean
  onPress?: () => void
  onLayout?: (event: LayoutChangeEvent) => void
}

export const Card = (props: CardProps) => {
  const colors = useColors()
  const styles = createStyles(colors)

  return (
    <TouchableOpacity
      onLayout={props.onLayout}
      onPress={props.onPress}
      disabled={!props.onPress}
      style={[
        styles.container,
        {borderWidth: props.hideBorder ? 0 : 1},
        props.style,
      ]}>
      {props.children}
    </TouchableOpacity>
  )
}

const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({
    container: {
      borderRadius: 12,
      backgroundColor: colors.white,
      padding: spaces.medium,
      borderColor: colors.divider,
      borderWidth: 1,
    },
  })

  return styles
}
