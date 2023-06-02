import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react'
import {
  Dimensions,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import Modal from 'react-native-modal'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Colors} from '../constants/colors'
import {icons} from '../constants/icons'
import {margins} from '../constants/margins'
import {textStyle} from '../constants/styles'
import {useColors} from '../hook/colorsHook'
import {Divider} from './divider'

interface ModalState {
  content: () => React.ReactNode
  customHeader?: (title?: string) => React.ReactNode
  headerText?: string
}

export type ShowModalProps = ModalState & {
  style?: StyleProp<ViewStyle>
}

interface ModalContextProps {
  showModal: (props: ShowModalProps) => void
  closeModal: () => void
}

const ModalProviderContext = createContext<ModalContextProps>({
  showModal: () => {},
  closeModal: () => {},
})

const initialState: ModalState = {
  content: () => <View />,
}

export const BottomModalProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [style, setStyle] = useState<StyleProp<ViewStyle> | undefined>()
  const [content, setContent] = useState<ModalState>({content: () => <View />})
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const safeAreaInsets = useSafeAreaInsets()

  const colors = useColors()
  const styles = createStyles(colors)

  const showModal = useCallback((props: ShowModalProps) => {
    setContent(props)
    setStyle(props.style)
    setIsVisible(true)
  }, [])

  const closeModal = () => {
    setContent(initialState)
    setIsVisible(false)
  }

  const renderHeader = () => {
    if (content.customHeader) {
      return content.customHeader(content.headerText)
    } else if (content.headerText) {
      return (
        <View style={[margins.mtBig, margins.mrBig, margins.mlBig]}>
          <View style={styles.row}>
            <Text style={[textStyle.smallTitle, styles.flex1]}>
              {content.headerText}
            </Text>
            <TouchableOpacity onPress={closeModal}>
              <Image source={icons.close} />
            </TouchableOpacity>
          </View>
          <Divider style={[margins.mtMedium, margins.mbMedium]} />
        </View>
      )
    }
    return <View />
  }

  return (
    <ModalProviderContext.Provider value={{showModal, closeModal}}>
      {children}
      {isVisible && (
        <Modal
          style={styles.modal}
          onSwipeComplete={closeModal}
          onBackdropPress={closeModal}
          onDismiss={closeModal}
          isVisible={isVisible}>
          <View
            style={[
              styles.modalContainer,
              {paddingBottom: safeAreaInsets.bottom},
              style,
            ]}>
            {renderHeader()}
            {content.content()}
          </View>
        </Modal>
      )}
    </ModalProviderContext.Provider>
  )
}

export const useBottomModal = () => {
  return useContext(ModalProviderContext)
}

const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({
    view: {
      flex: 1,
    },
    flex1: {
      flex: 1,
    },
    modal: {justifyContent: 'flex-end', margin: 0},
    modalContainer: {
      elevation: 5,
      shadowColor: colors.shadow,
      shadowRadius: 10,
      shadowOffset: {
        height: -3,
        width: -3,
      },

      maxHeight: Dimensions.get('screen').height * 0.8,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      backgroundColor: colors.white,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  })

  return styles
}
