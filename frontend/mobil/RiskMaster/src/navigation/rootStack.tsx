import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import {Image} from 'react-native'
import {colors} from '../constants/colors'
import {icons} from '../constants/icons'
import {spaces} from '../constants/spaces'
import {textStyle} from '../constants/styles'
import {SplashScreen} from '../screens/auth/splashScreen'
import {
  AssessmentDetailsScreen,
  AssessmentDetailsScreenProps,
} from '../screens/companies/assessmentDetailsScreen'
import {
  CompanyDetailsScreen,
  CompanyDetailsScreenProps,
} from '../screens/companies/companyDetailsScreen'
import {
  CreateAssessmentScreen,
  CreateAssessmentScreenProps,
} from '../screens/companies/createAssessmentScreen'
import {
  CreateCompanyScreen,
  CreateCompanyScreenProps,
} from '../screens/companies/createCompanyScreen'
import {
  PhysicalRiskScreen,
  PhysicalRiskScreenProps,
} from '../screens/companies/physicalRiskScreen'
import {AuthStack} from './authStack'
import {RootTab} from './rootTab'

export type RootStackProps = {
  SplashScreen: undefined
  AuthStack: undefined
  RootTab: undefined
  CreateCompany?: CreateCompanyScreenProps
  CompanyDetailsScreen: CompanyDetailsScreenProps
  CreateAssessment?: CreateAssessmentScreenProps
  AsseessmentDetailsScreen: AssessmentDetailsScreenProps
  PhysicalRiskScreen?: PhysicalRiskScreenProps
}

export const RootStack = () => {
  const Root = createStackNavigator<RootStackProps>()

  return (
    <Root.Navigator screenOptions={defaultOptions}>
      <Root.Screen name="SplashScreen" component={SplashScreen} />
      <Root.Screen name="AuthStack" component={AuthStack} />
      <Root.Screen name="RootTab" component={RootTab} />
      <Root.Screen
        name="CreateCompany"
        component={CreateCompanyScreen}
        options={{...modalWithBack}}
      />
      <Root.Screen
        name="CompanyDetailsScreen"
        component={CompanyDetailsScreen}
        options={{...modalWithBack}}
      />
      <Root.Screen
        name="CreateAssessment"
        component={CreateAssessmentScreen}
        options={{...modalWithBack}}
      />
      <Root.Screen
        name="AsseessmentDetailsScreen"
        component={AssessmentDetailsScreen}
        options={{...modalWithBack}}
      />

      <Root.Screen
        name="PhysicalRiskScreen"
        component={PhysicalRiskScreen}
        options={{...modalWithBack, title: 'Targoncakezelő'}}
      />
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
      style={{
        margin: spaces.contentHorizontal,
        resizeMode: 'contain',
        tintColor: colors.primary,
      }}
      source={icons.arrow_back}
    />
  ),
}
