import React from 'react'
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import {Colors} from '../../constants/colors'
import {useColors} from '../../hook/colorsHook'

export interface IconButtonProps {
  icon: ImageSourcePropType
  type?: 'primary' | 'secondary'
  onPress: () => void
  style?: StyleProp<ViewStyle>
  iconStyle?: StyleProp<ImageStyle>
  disabled?: boolean
  size?: 'small' | 'normal'
}

export const IconButton = ({size = 'normal', ...props}: IconButtonProps) => {
  const colors = useColors()
  const styles = createStyles(colors)

  const opacity = props.disabled ? 0.5 : 1

  const getContainerStyle = () => {
    if (props.type === 'secondary') {
      return {
        backgroundColor: 'transparent',
        borderColor: colors.primary,
      }
    }
    return {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    }
  }

  const getTintColor = () => {
    if (props.type === 'secondary') {
      return {
        tintColor: colors.text.primary,
      }
    }
    return {
      tintColor: colors.white,
    }
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        size === 'small' && styles.smallContainer,
        getContainerStyle(),
        props.style,
        {opacity: opacity},
      ]}
      onPress={props.onPress}
      disabled={props.disabled}>
      <Image
        source={props.icon}
        style={[
          size === 'small' && styles.smallIcon,
          getTintColor(),
          props.iconStyle,
        ]}
      />
    </TouchableOpacity>
  )
}

const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderRadius: 6,
      borderColor: colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
      width: 40,
    },
    smallContainer: {
      height: 22,
      width: 22,
    },
    smallIcon: {
      height: 18,
      width: 18,
    },
  })
  return styles
}
