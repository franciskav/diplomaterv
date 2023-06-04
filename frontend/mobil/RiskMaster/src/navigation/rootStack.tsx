import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import {Image} from 'react-native'
import {colors} from '../constants/colors'
import {icons} from '../constants/icons'
import {spaces} from '../constants/spaces'
import {textStyle} from '../constants/styles'
import {AuthStack} from './authStack'
import {RootTab} from './rootTab'

export type RootStackProps = {
  AuthStack: undefined
  RootTab: undefined
}

export const RootStack = () => {
  const Root = createStackNavigator<RootStackProps>()

  return (
    <Root.Navigator screenOptions={defaultOptions}>
      <Root.Screen name="AuthStack" component={AuthStack} />
      <Root.Screen name="RootTab" component={RootTab} />
    </Root.Navigator>
  )
}

const defaultOptions: StackNavigationOptions = {
  headerShown: false,
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: colors.white,
  },
  headerBackTitleVisible: false,
}

const modalOptions: StackNavigationOptions = {
  headerShown: true,
  headerTitleAlign: 'left',
  headerTitleStyle: textStyle.title,
  headerLeft: () => null,
}

const modalWithBack: StackNavigationOptions = {
  headerShown: true,
  headerTitleAlign: 'center',
  headerTitleStyle: textStyle.title,
  headerBackImage: p => (
    <Image
      style={{margin: spaces.contentHorizontal, resizeMode: 'contain'}}
      source={icons.arrow_back}
    />
  ),
}
