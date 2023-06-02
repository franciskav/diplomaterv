import React from 'react'
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native'
import {Colors} from '../constants/colors'
import {fontSizes, fonts} from '../constants/fonts'
import {icons} from '../constants/icons'
import {margins} from '../constants/margins'
import {spaces} from '../constants/spaces'
import {useColors} from '../hook/colorsHook'
import {ButtonProps, CustomButton} from './buttons/button'

interface ListEmptyComponentProps {
  style?: StyleProp<ViewStyle>
  icon?: ImageSourcePropType
  text: string
  button?: ButtonProps
  error?: string
  errorButton?: ButtonProps
}

export const ListEmptyComponent = (props: ListEmptyComponentProps) => {
  const colors = useColors()
  const styles = createStyles(colors)

  return (
    <View style={[styles.center, props.style]}>
      {(props.icon || props.error) && (
        <ImageBackground
          source={icons.empty_list}
          style={styles.imageBackground}>
          <Image
            source={
              props.error === undefined && props.icon
                ? props.icon
                : icons.error_list
            }
          />
        </ImageBackground>
      )}
      {props.error === undefined ? (
        <Text style={[styles.infoText, margins.mtLarge, margins.mbLarge]}>
          {props.text}
        </Text>
      ) : (
        <Text style={[styles.errorText, margins.mtLarge, margins.mbLarge]}>
          {props.error}
        </Text>
      )}
      {props.error === undefined && props.button && (
        <CustomButton
          {...props.button}
          style={{paddingHorizontal: spaces.extraLarge}}
        />
      )}
      {props.error && props.errorButton && (
        <CustomButton
          {...props.errorButton}
          style={{paddingHorizontal: spaces.extraLarge}}
        />
      )}
    </View>
  )
}

const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({
    center: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    infoText: {
      textAlign: 'center',
      fontFamily: fonts.medium,
      fontSize: fontSizes.medium,
      color: colors.text.primary,
    },
    errorText: {
      textAlign: 'center',
      fontFamily: fonts.medium,
      fontSize: fontSizes.medium,
      color: colors.error,
    },
    imageBackground: {
      width: 112,
      height: 112,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
  return styles
}
