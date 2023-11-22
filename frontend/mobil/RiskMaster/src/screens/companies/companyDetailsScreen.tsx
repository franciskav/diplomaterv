import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {debounce} from 'lodash'
import {useContext, useEffect, useRef, useState} from 'react'
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
import {AssessmentContext} from '../../context/assessmentProvider'
import {CompanyContext} from '../../context/companyProvider'
import {useColors} from '../../hook/colorsHook'
import {AssessmentDto} from '../../model/assessmentDto'
import {RootStackProps} from '../../navigation/rootStack'
import {AssessmentListItem} from './components/assessmentListItem'

export interface CompanyDetailsScreenProps {
  companyId: string
  companyName: string
}

export const CompanyDetailsScreen = () => {
  const colors = useColors()
  const styles = createStyles(colors)

  const route = useRoute<RouteProp<RootStackProps, 'CompanyDetailsScreen'>>()
  const navigation = useNavigation<StackNavigationProp<RootStackProps>>()

  const companyContext = useContext(CompanyContext)
  const assessmentContext = useContext(AssessmentContext)

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
              navigation.push('CreateAssessment', {
                companyId: route.params.companyId,
              })
            }}
          />
          <IconButton
            style={margins.mrMedium}
            type="secondary"
            size="small"
            icon={icons.sort}
            onPress={() => {
              setIsSearchOpen(!isSearchOpen)
            }}
          />
        </View>
      ),
    })
  }, [isSearchOpen])

  const loadData = () => {
    companyContext.loadCompanyDetails(route.params.companyId)
    assessmentContext.loadAssessments(route.params.companyId)
  }

  useEffect(() => {
    loadData()
  }, [
    assessmentContext.assessmentsSearcText,
    assessmentContext.assessmentsSort,
  ])

  const debouncedSearch = useRef(
    debounce(async text => {
      assessmentContext.setAssessmentsSearcText(text === '' ? undefined : text)
    }, 1000),
  ).current

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  const renderHeader = () => {
    return (
      <View style={styles.searcRow}>
        <CustomTextInput
          style={[styles.flex1, margins.mrNormal]}
          textInputProps={{
            value: searchText,
            onChangeText: value => {
              setSearchText(value)
              debouncedSearch(value)
            },
            returnKeyType: 'done',
            placeholder: strings.common.search,
          }}
        />
        <ListButton
          icon={icons.sort}
          selected={assessmentContext.assessmentsSort}
          data={[
            {
              name: strings.common.sort.nameIncreasing,
              value: 'name',
              onPress: () => {
                assessmentContext.setAssessmentsSort('name')
              },
            },
            {
              name: strings.common.sort.nameDecreasing,
              value: '-name',
              onPress: () => {
                assessmentContext.setAssessmentsSort('-name')
              },
            },
            {
              name: strings.common.sort.dateIncreasing,
              value: 'date',
              onPress: () => {
                assessmentContext.setAssessmentsSort('date')
              },
            },
            {
              name: strings.common.sort.dateDecreasing,
              value: '-date',
              onPress: () => {
                assessmentContext.setAssessmentsSort('-date')
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
            companyContext.companyDetails?.address.zipCode
          } ${companyContext.companyDetails?.address.city}, ${
            companyContext.companyDetails?.address.street
          } ${companyContext.companyDetails?.address.door ?? ''}`}</Text>
          <IconButton
            style={{borderWidth: 0}}
            size="small"
            type="secondary"
            icon={icons.edit}
            onPress={() => {
              navigation.push('CreateCompany', {
                companyId: route.params.companyId,
              })
            }}
          />
        </View>
        <Text
          style={
            textStyle.labelSecondary
          }>{`${companyContext.companyDetails?.contact.name}`}</Text>
        <Text
          style={
            textStyle.labelSecondary
          }>{`${companyContext.companyDetails?.contact.email}`}</Text>
        <Text
          style={
            textStyle.labelSecondary
          }>{`${companyContext.companyDetails?.contact.phone}`}</Text>
      </View>
    )
  }

  const renderItem = (row: ListRenderItemInfo<AssessmentDto>) => {
    return (
      <AssessmentListItem
        item={row.item}
        onPress={() => {
          navigation.push('AsseessmentDetailsScreen', {
            assessmentId: row.item.id,
            assessmentName: row.item.name,
          })
        }}
        onEditPress={() => {
          navigation.push('CreateAssessment', {
            companyId: route.params.companyId,
            assessmentId: row.item.id,
          })
        }}
        onDeletePress={() => {
          assessmentContext.deleteAssessment(row.item.id)
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
            navigation.push('CreateAssessment', {
              companyId: route.params.companyId,
            })
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
        data={assessmentContext.assessments}
        renderItem={renderItem}
        ItemSeparatorComponent={itemSeparator}
        ListEmptyComponent={listEmptyComponent}
        refreshing={companyContext.isLoading || assessmentContext.isLoading}
        onRefresh={loadData}
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
