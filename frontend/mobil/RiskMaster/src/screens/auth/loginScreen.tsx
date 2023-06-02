import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {CustomButton} from '../../components/buttons/button'
import {IconButton} from '../../components/buttons/iconButton'
import {ListButton} from '../../components/buttons/listButton'
import {Card} from '../../components/cards/card'
import {ItemPicker} from '../../components/inputs/itemPicker'
import {CustomTextInput} from '../../components/inputs/textInput'
import {Tab} from '../../components/tab/tab'
import {Colors} from '../../constants/colors'
import {icons} from '../../constants/icons'
import {margins} from '../../constants/margins'
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
      <CustomButton
        title="Login"
        onPress={() => {
          //navigation.replace('RootTab')
        }}
        type="primary"
        icon={icons.download}
        style={margins.mbNormal}
      />
      <CustomButton
        title="Login"
        onPress={() => {
          //navigation.replace('RootTab')
        }}
        type="secondary"
        icon={icons.download}
        style={margins.mbNormal}
      />
      <View
        style={[
          {flexDirection: 'row', justifyContent: 'space-around'},
          margins.mbNormal,
        ]}>
        <IconButton icon={icons.sort} onPress={() => {}} type="primary" />
        <IconButton icon={icons.sort} onPress={() => {}} type="secondary" />
        <ListButton
          icon={icons.sort}
          type="primary"
          data={[
            {
              name: 'egy',
              icon: icons.edit,
              onPress: () => {
                console.log('egy')
              },
            },
            {
              name: 'kettő',
              icon: icons.delete,
              onPress: () => {
                console.log('kettő')
              },
              isAccent: true,
            },
          ]}
          headerText="Rendezés"
        />
      </View>
      <Card style={margins.mbNormal}>
        <View>
          <Text>{'Hello'}</Text>
        </View>
      </Card>
      <Tab
        buttons={[
          {
            title: 'Kockázatok',
            onPress: () => {},
          },
          {
            title: 'Fényképek',
            onPress: () => {},
          },
        ]}
        selected={0}
      />
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
