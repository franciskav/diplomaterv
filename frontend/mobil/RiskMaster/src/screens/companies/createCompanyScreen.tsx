import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useEffect, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {BottomCard} from '../../components/cards/bottomCard'
import {Divider} from '../../components/divider'
import {CustomTextInput} from '../../components/inputs/textInput'
import {Colors} from '../../constants/colors'
import {strings} from '../../constants/localization'
import {margins} from '../../constants/margins'
import {spaces} from '../../constants/spaces'
import {textStyle} from '../../constants/styles'
import {useColors} from '../../hook/colorsHook'
import {RootStackProps} from '../../navigation/rootStack'
import {ValidationHelper} from '../../utility/helpers/validationHelper'

interface Errors {
  companyName?: string
  zipCode?: string
  city?: string
  street?: string
  door?: string
  contactName?: string
  email?: string
  phone?: string
}

export interface CreateCompanyScreenProps {
  companyId: string
}

export const CreateCompanyScreen = () => {
  const colors = useColors()
  const styles = createStyles(colors)
  const safeAreaInsets = useSafeAreaInsets()

  const route = useRoute<RouteProp<RootStackProps, 'CreateCompany'>>()
  const navigation = useNavigation<StackNavigationProp<RootStackProps>>()

  //TODO: set default values if update
  const [companyName, setCompanyName] = useState<string>('')
  const [zipCode, setZipCode] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [street, setStreet] = useState<string>('')
  const [door, setDoor] = useState<string>('')
  const [contactName, setContactName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [errors, setErrors] = useState<Errors>({})

  useEffect(() => {
    navigation.setOptions({
      title: route.params?.companyId
        ? strings.createCompany.editTitle
        : strings.createCompany.createTitle,
    })
  }, [])

  const isValidForm = () => {
    const errors: Errors = {}

    if (!companyName) {
      errors.companyName = strings.common.errors.empty
    }

    if (!zipCode) {
      errors.zipCode = strings.common.errors.empty
    }

    if (!city) {
      errors.city = strings.common.errors.empty
    }

    if (!street) {
      errors.street = strings.common.errors.empty
    }

    if (!contactName) {
      errors.contactName = strings.common.errors.empty
    }

    if (!email) {
      errors.email = strings.common.errors.empty
    } else if (!ValidationHelper.isValidEmail(email)) {
      errors.email = strings.common.errors.invalidEmail
    }

    if (!phone) {
      errors.phone = strings.common.errors.empty
    }

    setErrors(errors)

    return Object.keys(errors).length === 0
  }

  const onSavePress = () => {
    //navigation.goBack()
    if (isValidForm()) {
      //TODO: save or update company
    }
  }

  return (
    <View style={styles.flex1}>
      <KeyboardAwareScrollView
        style={[styles.container, {paddingBottom: safeAreaInsets.bottom}]}
        contentContainerStyle={styles.contentContainer}>
        <Text style={[textStyle.smallTitle, margins.mbNormal]}>
          {strings.createCompany.companyData}
        </Text>
        <CustomTextInput
          label={strings.createCompany.companyName}
          style={[margins.mbSmall]}
          error={errors.companyName}
          textInputProps={{
            value: companyName,
            onChangeText: value => {
              setCompanyName(value)
              if (errors.companyName !== undefined) {
                setErrors({...errors, companyName: undefined})
              }
            },
            returnKeyType: 'done',
          }}
        />
        <View style={styles.row}>
          <CustomTextInput
            label={strings.createCompany.city}
            style={[styles.flex1, margins.mrNormal, margins.mbSmall]}
            error={errors.city}
            textInputProps={{
              value: city,
              onChangeText: value => {
                setCity(value)
                if (errors.city !== undefined) {
                  setErrors({...errors, city: undefined})
                }
              },
              returnKeyType: 'done',
            }}
          />
          <CustomTextInput
            label={strings.createCompany.zipCode}
            style={[margins.mbSmall]}
            error={errors.zipCode}
            textInputProps={{
              value: zipCode,
              onChangeText: value => {
                setZipCode(value)
                if (errors.zipCode !== undefined) {
                  setErrors({...errors, zipCode: undefined})
                }
              },
              returnKeyType: 'done',
            }}
          />
        </View>
        <CustomTextInput
          label={strings.createCompany.street}
          style={[margins.mbSmall]}
          error={errors.street}
          textInputProps={{
            value: street,
            onChangeText: value => {
              setStreet(value)
              if (errors.street !== undefined) {
                setErrors({...errors, street: undefined})
              }
            },
            returnKeyType: 'done',
          }}
        />
        <CustomTextInput
          label={strings.createCompany.door}
          style={[margins.mbSmall]}
          error={errors.door}
          textInputProps={{
            value: door,
            onChangeText: value => {
              setDoor(value)
              if (errors.door !== undefined) {
                setErrors({...errors, door: undefined})
              }
            },
            returnKeyType: 'done',
          }}
        />
        <Divider />
        <Text style={[textStyle.smallTitle, margins.mbNormal]}>
          {strings.createCompany.contactData}
        </Text>
        <CustomTextInput
          label={strings.createCompany.contactName}
          style={[margins.mbSmall]}
          error={errors.contactName}
          textInputProps={{
            value: contactName,
            onChangeText: value => {
              setContactName(value)
              if (errors.contactName !== undefined) {
                setErrors({...errors, contactName: undefined})
              }
            },
            returnKeyType: 'done',
          }}
        />
        <CustomTextInput
          label={strings.createCompany.email}
          style={[margins.mbSmall]}
          error={errors.email}
          textInputProps={{
            value: email,
            onChangeText: value => {
              setEmail(value)
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
          label={strings.createCompany.phone}
          style={[margins.mbSmall]}
          error={errors.phone}
          textInputProps={{
            value: phone,
            onChangeText: value => {
              setPhone(value)
              if (errors.phone !== undefined) {
                setErrors({...errors, phone: undefined})
              }
            },
            returnKeyType: 'done',
          }}
        />
      </KeyboardAwareScrollView>
      <BottomCard
        button1={{
          title: strings.common.buttons.cancel,
          type: 'secondary',
          onPress: () => {
            navigation.goBack()
          },
        }}
        button2={{
          title: strings.common.buttons.save,
          onPress: onSavePress,
        }}
        safeArea
      />
    </View>
  )
}

const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({
    flex1: {
      flex: 1,
    },
    row: {
      flexDirection: 'row',
    },
    container: {
      backgroundColor: colors.white,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: spaces.contentHorizontal,
      paddingVertical: spaces.contentVertical,
    },
  })
  return styles
}
