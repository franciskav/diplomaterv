import React from 'react'
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native'
import {colors} from '../constants/colors'

interface LoaderProps {
  isModal?: boolean
}

export const Loader = (props: LoaderProps) => {
  if (props.isModal) {
    return (
      <Modal visible={true} transparent>
        <View style={styles.container}>
          <View style={styles.center}>
            <ActivityIndicator size={'large'} color={colors.primary} />
          </View>
        </View>
      </Modal>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <ActivityIndicator size={'large'} color={colors.primary} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.shadow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
