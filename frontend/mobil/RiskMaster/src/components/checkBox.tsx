import CheckBox from '@react-native-community/checkbox'
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {Colors} from '../constants/colors'
import {textStyle} from '../constants/styles'
import {useColors} from '../hook/colorsHook'

interface CustomCheckBoxProps {
  value: boolean
  onValueChange: (value: boolean) => void
  text: string
  disabled?: boolean
}

export const CustomCheckBox = (props: CustomCheckBoxProps) => {
  const colors = useColors()
  const styles = createStyles(colors)

  const getBorderColor = () => {
    if (props.value) {
      return {
        borderColor: colors.primary,
        backgroundColor: colors.primary,
      }
    } else {
      return {
        borderColor: colors.divider,
      }
    }
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        props.onValueChange(!props.value)
      }}
      disabled={props.disabled}>
      <View style={[styles.checkBoxContainer, getBorderColor()]}></View>
      <CheckBox
        value={props.value}
        onValueChange={props.onValueChange}
        hideBox
        tintColors={{
          false: colors.divider,
          true: colors.primary,
        }}
        onCheckColor={colors.white}
        pointerEvents={Platform.OS === 'ios' ? 'none' : undefined}
      />
      <Text style={textStyle.body}>{props.text}</Text>
    </TouchableOpacity>
  )
}

const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkBoxContainer: {
      borderWidth: 2,
      borderRadius: 2,
      width: 19,
      height: 19,
      position: 'absolute',
      left: 7,
    },
  })

  return styles
}
