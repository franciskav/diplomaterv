import React from 'react'
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import {Colors} from '../../constants/colors'
import {useColors} from '../../hook/colorsHook'
import {TabButton} from './tabButton'

interface TabButtonProps {
  title: string
  onPress: (index: number) => void
}

interface TabProps {
  buttons: TabButtonProps[]
  selected: number
  style?: StyleProp<ViewStyle>
  disabled?: boolean
}

export const Tab = (props: TabProps) => {
  const colors = useColors()
  const styles = createStyles(colors)

  const getOpacity = () => {
    if (props.disabled) {
      return {opacity: 0.5}
    }
    return {opacity: 1.0}
  }

  return (
    <View style={[styles.container, getOpacity(), props.style]}>
      {props.buttons.map((button, index) => {
        return (
          <View key={index.toString()} style={styles.row}>
            <TabButton
              title={button.title}
              onPress={btnIndex => {
                button.onPress(btnIndex)
              }}
              index={index}
              isActive={index === props.selected}
              disabled={props.disabled}
              style={styles.flex1}
            />
          </View>
        )
      })}
    </View>
  )
}

const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({
    container: {
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.tab.backgroundInactive,
      backgroundColor: colors.tab.backgroundInactive,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 3,
    },
    flex1: {
      flex: 1,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    separator: {
      width: 1,
      height: 16,
      backgroundColor: colors.divider,
    },
  })

  return styles
}
