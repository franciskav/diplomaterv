import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useContext, useState} from 'react'
import {StyleSheet} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {CustomButton} from '../../components/buttons/button'
import {CustomTextInput} from '../../components/inputs/textInput'
import {Loader} from '../../components/loader'
import {Colors} from '../../constants/colors'
import {icons} from '../../constants/icons'
import {strings} from '../../constants/localization'
import {margins} from '../../constants/margins'
import {spaces} from '../../constants/spaces'
import {AuthContext} from '../../context/authProvider'
import {useColors} from '../../hook/colorsHook'
import {RootStackProps} from '../../navigation/rootStack'
import {ValidationHelper} from '../../utility/helpers/validationHelper'

interface SignUpErrors {
  company?: string
  lastName?: string
  firsName?: string
  email?: string
  password?: string
  passwordAgain?: string
}

export const SignUpScreen = () => {
  const colors = useColors()
  const styles = createStyles(colors)
  const safeAreaInsets = useSafeAreaInsets()

  const navigation = useNavigation<StackNavigationProp<RootStackProps>>()

  const authContext = useContext(AuthContext)

  const [company, setCompany] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [firsName, setFirsName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordAgain, setPasswordAgain] = useState<string>('')
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [isPasswordAgainHidden, setIsPasswordAgainHidden] = useState(true)
  const [errors, setErrors] = useState<SignUpErrors>({})

  const isValidForm = () => {
    const errors: SignUpErrors = {}

    if (!email) {
      errors.email = strings.common.errors.empty
    } else if (!ValidationHelper.isValidEmail(email)) {
      errors.email = strings.common.errors.invalidEmail
    }

    if (!company) {
      errors.company = strings.common.errors.empty
    }

    if (!lastName) {
      errors.lastName = strings.common.errors.empty
    }

    if (!firsName) {
      errors.firsName = strings.common.errors.empty
    }

    if (!password) {
      errors.password = strings.common.errors.empty
    }

    if (!passwordAgain) {
      errors.passwordAgain = strings.common.errors.empty
    } else if (password !== passwordAgain) {
      errors.passwordAgain = strings.common.errors.passwordsDontMatch
    }

    setErrors(errors)

    return Object.keys(errors).length === 0
  }

  const onSignUpPressed = () => {
    if (isValidForm()) {
      authContext.signUp(
        {
          company: company,
          firstName: firsName,
          lastName: lastName,
          email: email,
          password: password,
        },
        () => {
          navigation.replace('RootTab')
        },
      )
    }
  }

  return (
    <KeyboardAwareScrollView
      style={[styles.container, {paddingBottom: safeAreaInsets.bottom}]}
      contentContainerStyle={styles.contentContainer}>
      <CustomTextInput
        label={strings.signUp.company}
        style={[margins.mbSmall]}
        error={errors.company}
        textInputProps={{
          value: company,
          onChangeText: company => {
            setCompany(company)
            if (errors.company !== undefined) {
              setErrors({...errors, company: undefined})
            }
          },
          returnKeyType: 'done',
        }}
      />
      <CustomTextInput
        label={strings.signUp.lastName}
        style={[margins.mbSmall]}
        error={errors.lastName}
        textInputProps={{
          value: lastName,
          onChangeText: lastName => {
            setLastName(lastName)
            if (errors.lastName !== undefined) {
              setErrors({...errors, lastName: undefined})
            }
          },
          returnKeyType: 'done',
          autoCapitalize: 'words',
        }}
      />
      <CustomTextInput
        label={strings.signUp.firsName}
        style={[margins.mbSmall]}
        error={errors.firsName}
        textInputProps={{
          value: firsName,
          onChangeText: firsName => {
            setFirsName(firsName)
            if (errors.firsName !== undefined) {
              setErrors({...errors, firsName: undefined})
            }
          },
          returnKeyType: 'done',
          autoCapitalize: 'words',
        }}
      />
      <CustomTextInput
        label={strings.signUp.email}
        style={[margins.mbSmall]}
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
        }}
      />
      <CustomTextInput
        label={strings.signUp.password}
        style={[margins.mbSmall]}
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
        }}
        icon={isPasswordHidden ? icons.visibility : icons.visibility_off}
        onIconPress={() => setIsPasswordHidden(!isPasswordHidden)}
      />
      <CustomTextInput
        label={strings.signUp.passwordAgain}
        style={[margins.mbBig]}
        error={errors.passwordAgain}
        textInputProps={{
          value: passwordAgain,
          onChangeText: passwordAgain => {
            setPasswordAgain(passwordAgain)
            if (errors.passwordAgain !== undefined) {
              setErrors({...errors, passwordAgain: undefined})
            }
          },
          secureTextEntry: isPasswordAgainHidden,
          keyboardType: 'default',
          autoComplete: 'password',
          autoCapitalize: 'none',
        }}
        icon={isPasswordAgainHidden ? icons.visibility : icons.visibility_off}
        onIconPress={() => setIsPasswordAgainHidden(!isPasswordAgainHidden)}
      />
      <CustomButton
        title={strings.signUp.signUp}
        onPress={onSignUpPressed}
        type="primary"
        style={margins.mbNormal}
      />
      {authContext.isLoading && <Loader isModal />}
    </KeyboardAwareScrollView>
  )
}

const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.white,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: spaces.contentHorizontal,
      paddingVertical: spaces.contentVertical,
      justifyContent: 'center',
    },
  })
  return styles
}
