import React from 'react'
import {
  Image,
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
      <Image
        style={[
          styles.image,
          {tintColor: props.error ? colors.error : colors.primaryLight},
        ]}
        source={props.icon ?? props.error ? icons.error_list : icons.empty_list}
      />
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
    image: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
    },
  })
  return styles
}
