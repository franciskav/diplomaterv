import React from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import {Colors} from '../../constants/colors'
import {fontSizes, fonts} from '../../constants/fonts'
import {spaces} from '../../constants/spaces'
import {useColors} from '../../hook/colorsHook'

interface TabButtonProps {
  style?: StyleProp<ViewStyle>
  title: string
  onPress: (index: number) => void
  index: number
  isActive?: boolean
  disabled?: boolean
}

export const TabButton = (props: TabButtonProps) => {
  const colors = useColors()
  const styles = createStyles(colors)

  const getContainerStyle = () => {
    if (props.isActive) {
      return {
        backgroundColor: colors.white,
      }
    }
    return {
      backgroundColor: colors.tab.backgroundInactive,
    }
  }

  const getTextStyle = () => {
    if (props.isActive) {
      return {
        fontFamily: fonts.medium,
        fontSize: fontSizes.normal,
        color: colors.text.primary,
      }
    }
    return {
      fontFamily: fonts.regular,
      fontSize: fontSizes.normal,
      color: colors.text.primary,
    }
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        props.isActive ? styles.shadow : null,
        getContainerStyle(),
        props.style,
      ]}
      onPress={() => {
        props.onPress(props.index)
      }}
      disabled={props.disabled}>
      <Text style={getTextStyle()}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({
    container: {
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      padding: spaces.small,
    },
    shadow: {
      shadowColor: colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.17,
      shadowRadius: 2.54,
      elevation: 3,
    },
  })

  return styles
}
