import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import {colors} from '../constants/colors'
import {strings} from '../constants/localization'
import {textStyle} from '../constants/styles'
import {ProfilenScreen} from '../screens/profile/profileScreen'

export type ProfileStackProps = {
  ProfileScreen: undefined
}

export const ProfileStack = () => {
  const Stack = createStackNavigator<ProfileStackProps>()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfilenScreen}
        options={{...tabStackOptions, title: strings.profile.title}}
      />
    </Stack.Navigator>
  )
}

const defaultOptions: StackNavigationOptions = {
  headerShadowVisible: false,
}

const tabStackOptions: StackNavigationOptions = {
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: colors.white,
  },
  headerTitleAlign: 'left',
  headerTitleStyle: textStyle.title,
  headerBackTitleVisible: false,
}
