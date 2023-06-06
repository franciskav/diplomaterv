import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useEffect, useState} from 'react'
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {IconButton} from '../../components/buttons/iconButton'
import {ListButton} from '../../components/buttons/listButton'
import {CustomTextInput} from '../../components/inputs/textInput'
import {ListEmptyComponent} from '../../components/listEmptyComponent'
import {Colors} from '../../constants/colors'
import {icons} from '../../constants/icons'
import {strings} from '../../constants/localization'
import {margins} from '../../constants/margins'
import {spaces} from '../../constants/spaces'
import {textStyle} from '../../constants/styles'
import {useColors} from '../../hook/colorsHook'
import {AssessmentDto} from '../../model/assessmentDto'
import {CompanyDetailsDto} from '../../model/companyDetailsDto'
import {RootStackProps} from '../../navigation/rootStack'
import {AssessmentListItem} from './components/assessmentListItem'

const companyDetails: CompanyDetailsDto = {
  id: '1',
  name: 'Company name',
  lastAssessment: Date.now().toString(),
  address: {
    zipCode: '1117',
    city: 'Budapest',
    street: 'Magyar Tudósok Körútja 2',
  },
  contact: {
    name: 'John Doe',
    email: 'john-doe@mail.com',
    phone: '+36202233444',
  },
  assessments: [
    {
      id: '1',
      name: 'Csiszolókorong raktár',
      date: Date.now().toString(),
      locationType: 'Raktár',
      numberOfPositions: 2,
      riskLevels: [
        {
          level: 'I',
          percent: 0.85,
        },
        {
          level: 'II',
          percent: 0.08,
        },
        {
          level: 'III',
          percent: 0.05,
        },
        {
          level: 'IV',
          percent: 0.01,
        },
        {
          level: 'V',
          percent: 0.01,
        },
      ],
    },
    {
      id: '2',
      name: 'Iroda',
      date: Date.now().toString(),
      locationType: 'Iroda',
      numberOfPositions: 2,
      riskLevels: [
        {
          level: 'I',
          percent: 0.85,
        },
        {
          level: 'II',
          percent: 0.08,
        },
        {
          level: 'III',
          percent: 0.05,
        },
        {
          level: 'IV',
          percent: 0.01,
        },
        {
          level: 'V',
          percent: 0.01,
        },
      ],
    },
  ],
}

export interface CompanyDetailsScreenProps {
  companyId: string
  companyName: string
}

export const CompanyDetailsScreen = () => {
  const colors = useColors()
  const styles = createStyles(colors)

  const route = useRoute<RouteProp<RootStackProps, 'CompanyDetailsScreen'>>()
  const navigation = useNavigation<StackNavigationProp<RootStackProps>>()

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchText, setSearchText] = useState<string>('')

  useEffect(() => {
    navigation.setOptions({
      title: route.params.companyName,
      headerRight: () => (
        <View style={styles.row}>
          <IconButton
            style={margins.mrNormal}
            type="secondary"
            size="small"
            icon={icons.add}
            onPress={() => {
              //TODO: implement
              navigation.push('CreateAssessment')
            }}
          />
          <IconButton
            style={margins.mrMedium}
            type="secondary"
            size="small"
            icon={icons.sort}
            onPress={() => {
              //TODO: implement
              setIsSearchOpen(!isSearchOpen)
            }}
          />
        </View>
      ),
    })
  }, [isSearchOpen])

  const renderHeader = () => {
    return (
      <View style={styles.searcRow}>
        <CustomTextInput
          style={[styles.flex1, margins.mrNormal]}
          textInputProps={{
            value: searchText,
            onChangeText: value => {
              //TODO: implement
              setSearchText(value)
            },
            returnKeyType: 'done',
            placeholder: strings.common.search,
          }}
        />
        <ListButton
          icon={icons.sort}
          data={[
            {
              name: strings.common.sort.nameIncreasing,
              onPress: () => {
                //TODO: implement
              },
            },
            {
              name: strings.common.sort.nameDecreasing,
              onPress: () => {
                //TODO: implement
              },
            },
            {
              name: strings.common.sort.dateIncreasing,
              onPress: () => {
                //TODO: implement
              },
            },
            {
              name: strings.common.sort.dateDecreasing,
              onPress: () => {
                //TODO: implement
              },
            },
          ]}
          headerText={strings.common.sort.title}
        />
      </View>
    )
  }

  const renderInfo = () => {
    return (
      <View style={styles.infoRow}>
        <View style={styles.row}>
          <Text style={[textStyle.medium, styles.flex1, margins.mbNormal]}>{`${
            companyDetails.address.zipCode
          } ${companyDetails.address.city}, ${companyDetails.address.street} ${
            companyDetails.address.door ?? ''
          }`}</Text>
          <IconButton
            style={{borderWidth: 0}}
            size="small"
            type="secondary"
            icon={icons.edit}
            onPress={() => {
              //TODO: implement
              navigation.push('CreateCompany', {companyId: companyDetails.id})
            }}
          />
        </View>
        <Text
          style={
            textStyle.labelSecondary
          }>{`${companyDetails.contact.name}`}</Text>
        <Text
          style={
            textStyle.labelSecondary
          }>{`${companyDetails.contact.email}`}</Text>
        <Text
          style={
            textStyle.labelSecondary
          }>{`${companyDetails.contact.phone}`}</Text>
      </View>
    )
  }

  const renderItem = (row: ListRenderItemInfo<AssessmentDto>) => {
    return (
      <AssessmentListItem
        item={row.item}
        onPress={() => {
          //TODO: implement
        }}
        onEditPress={() => {
          navigation.push('CreateAssessment', {assessmentId: row.item.id})
        }}
        onDeletePress={() => {
          //TODO: implement
        }}
      />
    )
  }

  const itemSeparator = () => {
    return <View style={styles.separator} />
  }

  const listEmptyComponent = () => {
    return (
      <ListEmptyComponent
        text={strings.companyDetails.emptyList}
        button={{
          title: strings.companyDetails.addItem,
          onPress: () => {
            //TODO: implement
          },
        }}
      />
    )
  }

  return (
    <View style={styles.flex1}>
      {isSearchOpen && renderHeader()}
      {renderInfo()}
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        data={companyDetails.assessments}
        renderItem={renderItem}
        ItemSeparatorComponent={itemSeparator}
        ListEmptyComponent={listEmptyComponent}
        keyboardShouldPersistTaps={'handled'}
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
    searcRow: {
      flexDirection: 'row',
      paddingHorizontal: spaces.contentHorizontal,
      paddingVertical: spaces.small,
      backgroundColor: colors.white,
    },
    infoRow: {
      paddingHorizontal: spaces.contentHorizontal,
      paddingVertical: spaces.normal,
      backgroundColor: colors.white,
      borderColor: colors.background,
      borderTopWidth: spaces.normal,
      borderBottomWidth: spaces.normal,
    },
    container: {
      flexGrow: 1,
      backgroundColor: colors.background,
    },
    contentContainer: {
      flexGrow: 1,
      paddingHorizontal: spaces.contentHorizontal,
      paddingTop: spaces.normal,
      paddingBottom: spaces.extraLarge,
    },
    separator: {
      height: spaces.big,
    },
  })
  return styles
}
