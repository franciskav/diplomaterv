import {
  FlatList,
  Image,
  ImageSourcePropType,
  ImageStyle,
  ListRenderItemInfo,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import {Colors} from '../../constants/colors'
import {margins} from '../../constants/margins'
import {spaces} from '../../constants/spaces'
import {textStyle} from '../../constants/styles'
import {useColors} from '../../hook/colorsHook'
import {useBottomModal} from '../bottomModal'
import {IconButton} from './iconButton'

export interface MenuItem {
  name: string
  value: string
  icon?: ImageSourcePropType
  iconStyle?: StyleProp<ImageStyle>
  isAccent?: boolean
  onPress: () => void
}

interface ListButtonProps {
  data: MenuItem[]
  selected?: string
  headerText: string
  icon: ImageSourcePropType
  small?: boolean
  type?: 'primary' | 'secondary'
  style?: StyleProp<ViewStyle>
  iconStyle?: StyleProp<ImageStyle>
  disabled?: boolean
}

export const ListButton = (props: ListButtonProps) => {
  const colors = useColors()
  const styles = createStyles(colors)
  const {showModal, closeModal} = useBottomModal()

  const onItemPress = (item: MenuItem) => {
    item.onPress()
    closeModal()
  }

  const renderItem = (row: ListRenderItemInfo<MenuItem>) => {
    return (
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => {
          onItemPress(row.item)
        }}>
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
            row.item.value === props.selected
              ? textStyle.mediumBold
              : textStyle.medium,
            {color: row.item.isAccent ? colors.error : colors.text.primary},
          ]}>
          {row.item.name}
        </Text>
      </TouchableOpacity>
    )
  }
  const keyExtractor = (item: MenuItem, index: number) => index.toString()

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
      headerText: props.headerText,
    })
  }
  return (
    <IconButton
      icon={props.icon}
      type={props.type}
      onPress={onPress}
      style={props.style}
      iconStyle={props.iconStyle}
      disabled={props.disabled}
      size={props.small ? 'small' : 'normal'}
    />
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
