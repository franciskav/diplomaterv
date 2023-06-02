import React, {useEffect} from 'react'
import {
  Image,
  ImageSourcePropType,
  LayoutAnimation,
  StyleProp,
  StyleSheet,
  Text,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import {TextInput} from 'react-native-gesture-handler'
import {Colors} from '../../constants/colors'
import {margins} from '../../constants/margins'
import {spaces} from '../../constants/spaces'
import {textStyle} from '../../constants/styles'
import {useColors} from '../../hook/colorsHook'

interface CustomTextInputProps {
  textInputProps?: TextInputProps
  label?: string
  labelStyle?: StyleProp<TextStyle>
  error?: string
  errorStyle?: StyleProp<TextStyle>
  style?: StyleProp<ViewStyle>
  onPress?: () => void
  icon?: ImageSourcePropType
  onIconPress?: () => void
  disabled?: boolean
}

export const CustomTextInput = React.forwardRef(
  (props: CustomTextInputProps, ref: any) => {
    const colors = useColors()
    const styles = createStyles(colors)

    useEffect(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }, [props.error])

    const textInputPaddingRight = props.icon ? 40 : spaces.normal
    const opacity = props.disabled ? 0.5 : 1
    const editable = props.onPress
      ? !props.onPress
      : props.textInputProps?.editable

    return (
      <View
        style={[styles.container, props.style, {opacity: opacity}]}
        pointerEvents={props.disabled ? 'none' : 'auto'}>
        {props.label && (
          <Text style={[textStyle.label, margins.mbSmall, props.labelStyle]}>
            {props.label}
          </Text>
        )}
        <TouchableOpacity
          style={styles.touchableContainer}
          onPress={props.onPress}
          disabled={props.onPress === undefined}>
          <TextInput
            ref={ref}
            pointerEvents={props.onPress ? 'none' : 'auto'}
            {...props.textInputProps}
            style={[
              styles.textInput,
              props.textInputProps?.value
                ? textStyle.textInput
                : textStyle.placeholder,
              {
                paddingRight: textInputPaddingRight,
                borderColor: props.error ? colors.error : colors.primary,
              },
              props.textInputProps?.style,
            ]}
            editable={editable}
          />
          {props.icon && (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={props.onIconPress}
              disabled={!props.onIconPress}>
              <Image source={props.icon} style={styles.icon} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        <Text style={[textStyle.error, props.errorStyle]}>{props.error}</Text>
      </View>
    )
  },
)

const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({
    container: {},
    touchableContainer: {
      justifyContent: 'center',
    },
    textInput: {
      backgroundColor: colors.white,
      borderColor: colors.primary,
      height: 40,
      borderRadius: 8,
      borderWidth: 1,
      paddingHorizontal: spaces.normal,
    },
    iconContainer: {
      position: 'absolute',
      right: 10,
      height: 40,
      width: 25,
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      height: 25,
      width: 25,
      resizeMode: 'center',
    },
  })
  return styles
}
