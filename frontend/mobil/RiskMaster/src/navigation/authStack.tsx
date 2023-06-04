import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import React from 'react'
import {Image, Platform} from 'react-native'
import {colors} from '../constants/colors'
import {icons} from '../constants/icons'
import {strings} from '../constants/localization'
import {spaces} from '../constants/spaces'
import {textStyle} from '../constants/styles'
import {LoginScreen} from '../screens/auth/loginScreen'
import {SignUpScreen} from '../screens/auth/signUpScreen'

export type AuthStackProps = {
  Login: undefined
  SignUp: undefined
}

export const AuthStack = () => {
  const Auth = createStackNavigator<AuthStackProps>()

  return (
    <Auth.Navigator screenOptions={defaultOptions}>
      <Auth.Screen name="Login" component={LoginScreen} />
      <Auth.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{...header, title: strings.signUp.title}}
      />
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
      style={{
        margin: Platform.OS === 'ios' ? spaces.contentHorizontal : 0,
        resizeMode: 'contain',
        tintColor: colors.primary,
      }}
      source={icons.arrow_back}
    />
  ),
}

const header: StackNavigationOptions = {
  headerShown: true,
  headerTitleAlign: 'center',
}
