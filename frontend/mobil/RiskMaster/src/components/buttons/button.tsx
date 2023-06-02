import React from 'react'
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import {Colors} from '../../constants/colors'
import {margins} from '../../constants/margins'
import {spaces} from '../../constants/spaces'
import {textStyle} from '../../constants/styles'
import {useColors} from '../../hook/colorsHook'

export interface ButtonProps {
  title: string
  type?: 'primary' | 'secondary'
  disabled?: boolean
  icon?: ImageSourcePropType
  onPress: () => void
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  iconStyle?: StyleProp<ImageStyle>
}

export const CustomButton = (props: ButtonProps) => {
  const colors = useColors()
  const styles = createStyles(colors)

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

  const getOpacity = () => {
    if (props.disabled) {
      return {opacity: 0.5}
    }
    return {opacity: 1.0}
  }

  const getTextColor = () => {
    if (props.type === 'secondary') {
      return {
        color: colors.text.primary,
      }
    }
    return {
      color: colors.white,
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
      onPress={props.onPress}
      style={[styles.container, getContainerStyle(), getOpacity(), props.style]}
      disabled={props.disabled}>
      {props.icon && (
        <Image
          source={props.icon}
          style={[
            styles.icon,
            margins.mrSmall,
            getTintColor(),
            props.iconStyle,
          ]}
        />
      )}
      <Text
        style={[
          textStyle.button,
          textStyle.center,
          getTextColor(),
          props.textStyle,
        ]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}

const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({
    container: {
      height: 40,
      borderRadius: 8,
      borderWidth: 2,
      paddingHorizontal: spaces.contentHorizontal,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      maxHeight: 16,
      maxWidth: 16,
      resizeMode: 'contain',
    },
  })
  return styles
}
