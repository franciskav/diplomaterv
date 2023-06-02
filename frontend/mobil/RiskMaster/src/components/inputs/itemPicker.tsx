import {
  FlatList,
  Image,
  ImageSourcePropType,
  ListRenderItemInfo,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import {Colors} from '../../constants/colors'
import {icons} from '../../constants/icons'
import {margins} from '../../constants/margins'
import {spaces} from '../../constants/spaces'
import {textStyle} from '../../constants/styles'
import {useColors} from '../../hook/colorsHook'
import {useBottomModal} from '../bottomModal'
import {CustomTextInput} from './textInput'

export interface Item<T> {
  value: T
  name: string
  nameSecondary?: string
  icon?: ImageSourcePropType
  isAccent?: boolean
}

interface ItemPickerProps<T> {
  style?: StyleProp<ViewStyle>
  onSelect: (item: Item<T>) => void
  label?: string
  headerText?: string
  labelStyle?: StyleProp<TextStyle>
  data: Item<T>[]
  placeholder?: string
  item?: Item<T>
  error?: string
  disabled?: boolean
}

export const ItemPicker = (props: ItemPickerProps<any>) => {
  const colors = useColors()
  const styles = createStyles(colors)
  const {showModal, closeModal} = useBottomModal()

  const onItemPress = (item: Item<any>) => {
    props.onSelect(item)
    closeModal()
  }
  const renderItem = (row: ListRenderItemInfo<Item<any>>) => {
    return (
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => onItemPress(row.item)}>
        {row.item.icon && (
          <Image
            style={[
              styles.icon,
              margins.mrNormal,
              {
                tintColor: row.item.isAccent ? colors.error : colors.primary,
              },
            ]}
            source={row.item.icon}
          />
        )}
        <Text
          style={[
            textStyle.medium,
            {color: row.item.isAccent ? colors.error : colors.text.primary},
          ]}>
          {row.item.name}
        </Text>
      </TouchableOpacity>
    )
  }
  const keyExtractor = (item: Item<any>, index: number) => index.toString()

  const onPress = () => {
    showModal({
      content: () => (
        <FlatList
          initialNumToRender={20}
          style={styles.flatlist}
          data={props.data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      ),
      headerText: props.headerText ?? props.label,
    })
  }
  return (
    <CustomTextInput
      style={props.style}
      disabled={props.disabled}
      label={props.label}
      icon={icons.arrow_down}
      labelStyle={props.labelStyle}
      onPress={onPress}
      error={props.error}
      textInputProps={{
        placeholder: props.placeholder,
        value: props.item?.name,
      }}
    />
  )
}

const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({
    touchable: {
      padding: spaces.normal,
      flexDirection: 'row',
      alignItems: 'center',
    },
    flatlist: {
      paddingHorizontal: spaces.normal,
    },
    icon: {
      height: 18,
      width: 18,
    },
  })
  return styles
}
