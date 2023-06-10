import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useContext, useEffect, useState} from 'react'
import {Image, StyleSheet, Text, View} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {SafeAreaView} from 'react-native-safe-area-context'
import {CustomButton} from '../../components/buttons/button'
import {CustomTextInput} from '../../components/inputs/textInput'
import {Loader} from '../../components/loader'
import {Colors} from '../../constants/colors'
import {fontSizes, fonts} from '../../constants/fonts'
import {icons} from '../../constants/icons'
import {strings} from '../../constants/localization'
import {margins} from '../../constants/margins'
import {spaces} from '../../constants/spaces'
import {textStyle} from '../../constants/styles'
import {AuthContext, AuthStatus} from '../../context/authProvider'
import {useColors} from '../../hook/colorsHook'
import {AuthStackProps} from '../../navigation/authStack'
import {RootStackProps} from '../../navigation/rootStack'
import {ValidationHelper} from '../../utility/helpers/validationHelper'

interface LoginErrors {
  email?: string
  password?: string
}

export const LoginScreen = () => {
  const colors = useColors()
  const styles = createStyles(colors)

  const navigation = useNavigation<StackNavigationProp<RootStackProps>>()
  const authNavigation = useNavigation<StackNavigationProp<AuthStackProps>>()

  const authContext = useContext(AuthContext)

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [errors, setErrors] = useState<LoginErrors>({})

  useEffect(() => {
    if (authContext.authStatus === AuthStatus.LOGGED_IN) {
      onLoggedIn()
    }
  }, [authContext.authStatus])

  const onLoggedIn = async () => {
    navigation.replace('RootTab')
  }
  const isValidForm = () => {
    const errors: LoginErrors = {}

    if (!email) {
      errors.email = strings.common.errors.empty
    } else if (!ValidationHelper.isValidEmail(email)) {
      errors.email = strings.common.errors.invalidEmail
    }

    if (!password) {
      errors.password = strings.common.errors.empty
    }

    setErrors(errors)

    return Object.keys(errors).length === 0
  }

  const onLoginPressed = () => {
    if (isValidForm()) {
      authContext.login({
        email: email,
        password: password,
      })
    }
  }

  const onSignUpPress = () => {
    authNavigation.navigate('SignUp')
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        contentContainerStyle={styles.contentContainer}>
        <Image
          style={[styles.image, margins.mtExtraLarge]}
          source={icons.logo_string}
        />
        <View style={margins.mbExtraLarge}>
          <CustomTextInput
            label={strings.login.email}
            style={[margins.mbMedium]}
            error={errors.email}
            textInputProps={{
              value: email,
              onChangeText: email => {
                setEmail(email)
                if (errors.email !== undefined) {
                  setErrors({...errors, email: undefined})
                }
              },
              returnKeyType: 'done',
              keyboardType: 'email-address',
              autoComplete: 'email',
              autoCapitalize: 'none',
              placeholder: strings.login.emailPlaceholder,
            }}
          />
          <CustomTextInput
            label={strings.login.password}
            style={[margins.mbBig]}
            error={errors.password}
            textInputProps={{
              value: password,
              onChangeText: password => {
                setPassword(password)
                if (errors.password !== undefined) {
                  setErrors({...errors, password: undefined})
                }
              },
              secureTextEntry: isPasswordHidden,
              keyboardType: 'default',
              autoComplete: 'password',
              autoCapitalize: 'none',
              placeholder: strings.login.passwordPlaceholder,
            }}
            icon={isPasswordHidden ? icons.visibility : icons.visibility_off}
            onIconPress={() => setIsPasswordHidden(!isPasswordHidden)}
          />
          <CustomButton
            title={strings.login.login}
            onPress={onLoginPressed}
            type="primary"
            style={margins.mbNormal}
          />
        </View>
        <View style={[styles.registerContainer, margins.mtExtraLarge]}>
          <Text style={textStyle.body}>{strings.login.dontHaveProfile}</Text>
          <TouchableOpacity onPress={onSignUpPress}>
            <Text style={[styles.registerText]}>{strings.login.doSignUp}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      {authContext.isLoading && <Loader />}
    </SafeAreaView>
  )
}

const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.white,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: spaces.contentHorizontal,
      paddingVertical: spaces.contentVertical,
      justifyContent: 'space-around',
    },
    image: {
      alignSelf: 'center',
      height: 170,
      width: 170,
      resizeMode: 'contain',
    },
    registerContainer: {
      alignItems: 'center',
    },
    registerText: {
      fontFamily: fonts.medium,
      fontSize: fontSizes.medium,
      color: colors.text.primary,
      margin: spaces.normal,
      textDecorationStyle: 'solid',
      textDecorationLine: 'underline',
    },
  })
  return styles
}
