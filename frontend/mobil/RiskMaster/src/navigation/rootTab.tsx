import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import {Image} from 'react-native'
import {colors} from '../constants/colors'
import {fonts, fontSizes} from '../constants/fonts'
import {icons} from '../constants/icons'
import {strings} from '../constants/localization'
import {CompaniesStack} from './companiesStack'
import {NotificationStack} from './notificationStack'
import {ProfileStack} from './profileStack'

export type RootTabProps = {
  CompaniesStack: undefined
  NotificationStack: undefined
  ProfileStack: undefined
}

export const RootTab = () => {
  const Tab = createBottomTabNavigator<RootTabProps>()

  return (
    <Tab.Navigator screenOptions={{...tabBarOptions}}>
      <Tab.Screen
        options={{
          tabBarLabel: strings.tab.companies,
          tabBarIcon: (props: {
            focused: boolean
            color: string
            size: number
          }) => {
            return (
              <Image
                source={icons.company}
                style={{
                  tintColor: props.focused ? colors.primary : colors.text.light,
                }}
              />
            )
          },
        }}
        name="CompaniesStack"
        component={CompaniesStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: strings.tab.notifications,
          tabBarIcon: (props: {
            focused: boolean
            color: string
            size: number
          }) => {
            return (
              <Image
                source={icons.notifications}
                style={{
                  tintColor: props.focused ? colors.primary : colors.text.light,
                }}
              />
            )
          },
        }}
        name="NotificationStack"
        component={NotificationStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: strings.tab.profile,
          tabBarIcon: (props: {
            focused: boolean
            color: string
            size: number
          }) => {
            return (
              <Image
                source={icons.profile}
                style={{
                  tintColor: props.focused ? colors.primary : colors.text.light,
                }}
              />
            )
          },
        }}
        name="ProfileStack"
        component={ProfileStack}
      />
    </Tab.Navigator>
  )
}

const tabBarOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarActiveTintColor: colors.text.primary,
  tabBarInactiveTintColor: colors.text.light,
  tabBarLabelStyle: {
    fontFamily: fonts.medium,
    fontSize: fontSizes.extraSmall,
  },
}
