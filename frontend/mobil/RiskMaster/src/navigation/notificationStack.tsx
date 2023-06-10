import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import {colors} from '../constants/colors'
import {strings} from '../constants/localization'
import {textStyle} from '../constants/styles'
import {NotificationsScreen} from '../screens/notification/notificationsScreen'

export type NotificationStackProps = {
  NotificationsScreen: undefined
}

export const NotificationStack = () => {
  const Stack = createStackNavigator<NotificationStackProps>()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{...tabStackOptions, title: strings.notifications.title}}
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
