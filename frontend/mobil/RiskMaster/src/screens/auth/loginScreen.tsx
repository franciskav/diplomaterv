import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React, {useState} from 'react'
import {StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {CustomButton} from '../../components/buttons/button'
import {Colors} from '../../constants/colors'
import {icons} from '../../constants/icons'
import {margins} from '../../constants/margins'
import {spaces} from '../../constants/spaces'
import {useColors} from '../../hook/colorsHook'
import {RootStackProps} from '../../navigation/rootStack'

export const LoginScreen = () => {
  const colors = useColors()
  const styles = createStyles(colors)

  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  const navigation = useNavigation<StackNavigationProp<RootStackProps>>()

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomButton
        title="Login"
        onPress={() => {
          navigation.replace('RootTab')
        }}
        type="primary"
        icon={icons.download}
        style={margins.mbNormal}
      />
    </SafeAreaView>
  )
}

const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.white,
      paddingHorizontal: spaces.contentHorizontal,
    },
  })
  return styles
}
