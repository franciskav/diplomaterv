import {useState} from 'react'
import {StyleProp, StyleSheet, TextStyle, View, ViewStyle} from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import {Colors} from '../../constants/colors'
import {icons} from '../../constants/icons'
import {strings} from '../../constants/localization'
import {useColors} from '../../hook/colorsHook'
import {formatDate} from '../../utility/helpers/formatHelper'
import {CustomTextInput} from './textInput'

interface DatePickerProps {
  style?: StyleProp<ViewStyle>
  onSelect: (value: string) => void
  value?: string
  label?: string
  labelStyle?: StyleProp<TextStyle>
  placeholder?: string
  error?: string
  disabled?: boolean
}

export const DatePicker = (props: DatePickerProps) => {
  const colors = useColors()
  const styles = createStyles(colors)
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)

  return (
    <View>
      <CustomTextInput
        style={props.style}
        disabled={props.disabled}
        label={props.label}
        icon={icons.calendar}
        labelStyle={props.labelStyle}
        onPress={() => {
          setIsDatePickerVisible(true)
        }}
        error={props.error}
        textInputProps={{
          placeholder: props.placeholder,
          value: props.value ? formatDate(props.value) : undefined,
        }}
      />
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        cancelTextIOS={strings.common.buttons.cancel}
        confirmTextIOS={strings.common.buttons.ok}
        onConfirm={value => {
          props.onSelect(value.toDateString())
          setIsDatePickerVisible(false)
        }}
        onCancel={() => {
          setIsDatePickerVisible(false)
        }}
      />
    </View>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({})
  return styles
}
