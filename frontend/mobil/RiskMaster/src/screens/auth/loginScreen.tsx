import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {ItemPicker} from '../../components/inputs/itemPicker'
import {CustomTextInput} from '../../components/inputs/textInput'
import {Colors} from '../../constants/colors'
import {icons} from '../../constants/icons'
import {spaces} from '../../constants/spaces'
import {useColors} from '../../hook/colorsHook'
import {RootStackProps} from '../../navigation/rootStack'

export const LoginScreen = () => {
  const colors = useColors()
  const styles = createStyles(colors)

  const navigation = useNavigation<StackNavigationProp<RootStackProps>>()

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomTextInput
        textInputProps={{value: 'Valami valami valami'}}
        label={'Label'}
        //error={'Error'}
      />
      <ItemPicker
        onSelect={() => {}}
        headerText={'Cím'}
        data={[
          {
            value: 'egy',
            name: 'egy',
            icon: icons.edit,
          },
          {
            value: 'kettő',
            name: 'kettő',
            icon: icons.delete,
            isAccent: true,
          },
        ]}
      />
      <TouchableOpacity
        style={{alignSelf: 'center'}}
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
      //alignItems: 'center',
      backgroundColor: colors.background,
      paddingHorizontal: spaces.contentHorizontal,
    },
  })
  return styles
}
