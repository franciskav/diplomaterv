import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React from 'react'
import {Image} from 'react-native'
import {colors} from '../constants/colors'
import {icons} from '../constants/icons'
import {spaces} from '../constants/spaces'
import {textStyle} from '../constants/styles'
import {LoginScreen} from '../screens/auth/loginScreen'

export type AuthStackProps = {
  Login: undefined
}

export const AuthStack = () => {
  const Auth = createStackNavigator<AuthStackProps>()

  return (
    <Auth.Navigator screenOptions={defaultOptions}>
      <Auth.Screen name="Login" component={LoginScreen} />
    </Auth.Navigator>
  )
}

const defaultOptions: StackNavigationOptions = {
  headerShown: false,
  headerShadowVisible: false,
  headerBackTitleVisible: false,
  headerTintColor: colors.text.primary,
  headerTitleStyle: textStyle.title,
  headerBackImage: p => (
    <Image
      style={{margin: spaces.contentHorizontal, resizeMode: 'contain'}}
      source={icons.arrow_back}
    />
  ),
}

const header: StackNavigationOptions = {
  headerShown: true,
  headerTitleAlign: 'center',
}
