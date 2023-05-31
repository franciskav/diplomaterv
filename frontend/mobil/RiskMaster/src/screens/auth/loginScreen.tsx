import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, Text} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Colors} from '../../constants/colors'
import {useColors} from '../../hook/colorsHook'
import {RootStackProps} from '../../navigation/rootStack'

export const LoginScreen = () => {
  const colors = useColors()
  const styles = createStyles(colors)

  const navigation = useNavigation<StackNavigationProp<RootStackProps>>()

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        onPress={() => {
          navigation.replace('RootTab')
        }}>
        <Text>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.white,
    },
  })
  return styles
}
