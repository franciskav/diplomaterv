import React from 'react'
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import {Colors} from '../constants/colors'
import {spaces} from '../constants/spaces'
import {useColors} from '../hook/colorsHook'

interface dividerProps {
  style?: StyleProp<ViewStyle>
}

export const Divider = (props: dividerProps) => {
  const colors = useColors()
  const styles = createStyles(colors)
  return <View style={[styles.divider, props.style]} />
}

function createStyles(colors: Colors) {
  const styles = StyleSheet.create({
    divider: {
      height: 1,
      width: '100%',
      backgroundColor: colors.divider,
      marginBottom: spaces.medium,
      marginTop: spaces.medium,
    },
  })

  return styles
}
