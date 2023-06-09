import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useEffect, useState} from 'react'
import {StyleSheet, View} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {BottomCard} from '../../components/cards/bottomCard'
import {DatePicker} from '../../components/inputs/datePicker'
import {CustomTextInput} from '../../components/inputs/textInput'
import {Colors} from '../../constants/colors'
import {strings} from '../../constants/localization'
import {margins} from '../../constants/margins'
import {spaces} from '../../constants/spaces'
import {useColors} from '../../hook/colorsHook'
import {RootStackProps} from '../../navigation/rootStack'

interface Errors {
  name?: string
  date?: string
  type?: string
}

export interface CreateAssessmentScreenProps {
  assessmentId: string
}

export const CreateAssessmentScreen = () => {
  const colors = useColors()
  const styles = createStyles(colors)
  const safeAreaInsets = useSafeAreaInsets()

  const route = useRoute<RouteProp<RootStackProps, 'CreateAssessment'>>()
  const navigation = useNavigation<StackNavigationProp<RootStackProps>>()

  //TODO: set default values if update
  const [name, setName] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [type, setType] = useState<string>('')
  const [errors, setErrors] = useState<Errors>({})

  useEffect(() => {
    navigation.setOptions({
      title: route.params?.assessmentId
        ? strings.createAssessment.editTitle
        : strings.createAssessment.createTitle,
    })
  }, [])

  const isValidForm = () => {
    const errors: Errors = {}

    if (!name) {
      errors.name = strings.common.errors.empty
    }

    if (!date) {
      errors.date = strings.common.errors.empty
    }

    if (!type) {
      errors.type = strings.common.errors.empty
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
        <CustomTextInput
          label={strings.createAssessment.name}
          style={[margins.mbSmall]}
          error={errors.name}
          textInputProps={{
            value: name,
            onChangeText: value => {
              setName(value)
              if (errors.name !== undefined) {
                setErrors({...errors, name: undefined})
              }
            },
            returnKeyType: 'done',
          }}
        />
        <DatePicker
          label={strings.createAssessment.date}
          style={[margins.mbSmall]}
          error={errors.date}
          value={date}
          onSelect={setDate}
        />
        {/* TODO: item picker */}
        <CustomTextInput
          label={strings.createAssessment.type}
          style={[margins.mbSmall]}
          error={errors.type}
          textInputProps={{
            value: type,
            onChangeText: value => {
              setType(value)
              if (errors.type !== undefined) {
                setErrors({...errors, type: undefined})
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
