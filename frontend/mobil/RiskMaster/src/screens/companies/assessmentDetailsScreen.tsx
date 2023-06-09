import {RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useEffect, useState} from 'react'
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native'
import {IconButton} from '../../components/buttons/iconButton'
import {ListButton} from '../../components/buttons/listButton'
import {CustomTextInput} from '../../components/inputs/textInput'
import {ListEmptyComponent} from '../../components/listEmptyComponent'
import {Colors} from '../../constants/colors'
import {icons} from '../../constants/icons'
import {strings} from '../../constants/localization'
import {margins} from '../../constants/margins'
import {spaces} from '../../constants/spaces'
import {useColors} from '../../hook/colorsHook'
import {AssessmentDetailsDto} from '../../model/assessmentDetailsDto'
import {PositionDto} from '../../model/positionDto'
import {RootStackProps} from '../../navigation/rootStack'
import {PositionListItem} from './components/positionListItem'

const assessmentDetails: AssessmentDetailsDto = {
  id: '1',
  name: 'Gránit Zrt',
  locationType: 'Raktár',
  positions: [
    {
      id: '1',
      name: 'Targoncakezelő',
      risks: [
        {
          risk: 'Fizikai kockázat:',
          degree: 2,
        },
        {
          risk: 'Kémiai kockázat:',
          degree: undefined,
        },
        // {
        //   risk: 'Biológiai kockázat:',
        //   degree: undefined,
        // },
        // {
        //   risk: 'Pszichoszociális kockázat:',
        //   degree: undefined,
        // },
      ],
    },
    {
      id: '2',
      name: 'Műszakvezető',
      risks: [
        {
          risk: 'Fizikai kockázat:',
          degree: 3,
        },
        {
          risk: 'Kémiai kockázat:',
          degree: undefined,
        },
        // {
        //   risk: 'Biológiai kockázat:',
        //   degree: undefined,
        // },
        // {
        //   risk: 'Pszichoszociális kockázat:',
        //   degree: undefined,
        // },
      ],
    },
  ],
}

export interface AssessmentDetailsScreenProps {
  assessmentId: string
  assessmentName: string
}

export const AssessmentDetailsScreen = () => {
  const colors = useColors()
  const styles = createStyles(colors)

  const route =
    useRoute<RouteProp<RootStackProps, 'AsseessmentDetailsScreen'>>()
  const navigation = useNavigation<StackNavigationProp<RootStackProps>>()

  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchText, setSearchText] = useState<string>('')

  useEffect(() => {
    navigation.setOptions({
      title: route.params.assessmentName,
      headerRight: () => (
        <View style={styles.row}>
          {/* <IconButton
            style={margins.mrNormal}
            type="secondary"
            size="small"
            icon={icons.add}
            onPress={() => {
              //TODO: implement
              navigation.push('CreateAssessment')
            }}
          /> */}
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

  const renderItem = (row: ListRenderItemInfo<PositionDto>) => {
    return (
      <PositionListItem
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
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        data={assessmentDetails.positions}
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
      paddingTop: spaces.contentVertical,
      paddingBottom: spaces.extraLarge,
    },
    separator: {
      height: spaces.big,
    },
  })
  return styles
}
