import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import {colors} from '../constants/colors'
import {strings} from '../constants/localization'
import {textStyle} from '../constants/styles'
import {CompaniesScreen} from '../screens/companies/companiesScreen'

export type CompaniesStackProps = {
  CompaniesScreen: undefined
}

export const CompaniesStack = () => {
  const Stack = createStackNavigator<CompaniesStackProps>()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CompaniesScreen"
        component={CompaniesScreen}
        options={{...tabStackOptions, title: strings.companies.title}}
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
