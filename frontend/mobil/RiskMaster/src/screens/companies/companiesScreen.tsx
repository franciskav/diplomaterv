import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import dayjs from 'dayjs'
import {debounce} from 'lodash'
import {useContext, useEffect, useRef, useState} from 'react'
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
import {CompanyContext} from '../../context/companyProvider'
import {useColors} from '../../hook/colorsHook'
import {CompanyDto} from '../../model/companyDto'
import {RootStackProps} from '../../navigation/rootStack'
import {CompaniesListItem} from './components/companiesListItem'

const data: CompanyDto[] = [
  {
    id: '1',
    name: 'Gránit Zrt',
    lastAssessment: dayjs('2023-04-22').toString(),
  },
  {
    id: '2',
    name: 'Fruit Systems',
    lastAssessment: dayjs('2023-02-11').toString(),
  },
  {
    id: '3',
    name: 'Ant Labs',
    lastAssessment: dayjs('2022-05-1').toString(),
  },
  {
    id: '4',
    name: 'RailwayStory',
  },
]

export const CompaniesScreen = () => {
  const colors = useColors()
  const styles = createStyles(colors)

  const navigation = useNavigation<StackNavigationProp<RootStackProps>>()

  const companyContext = useContext(CompanyContext)

  const [searchText, setSearchText] = useState<string>('')

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          style={margins.mrMedium}
          type="secondary"
          size="small"
          icon={icons.add}
          onPress={() => {
            //TODO: implement
            navigation.push('CreateCompany')
          }}
        />
      ),
    })
  }, [])

  const loadCompanies = () => {
    companyContext.loadCompanies()
  }

  useEffect(() => {
    loadCompanies()
  }, [])

  useEffect(() => {
    loadCompanies()
  }, [companyContext.companiesSearcText])

  const debouncedSearch = useRef(
    debounce(async text => {
      companyContext.setCompaniesSearcText(text === '' ? undefined : text)
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

  const renderItem = (row: ListRenderItemInfo<CompanyDto>) => {
    return (
      <CompaniesListItem
        item={row.item}
        onPress={() => {
          //TODO: implement
          navigation.push('CompanyDetailsScreen', {
            companyId: row.item.id,
            companyName: row.item.name,
          })
        }}
        onEditPress={() => {
          navigation.push('CreateCompany', {companyId: row.item.id})
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
        text={strings.companies.emptyList}
        button={{
          title: strings.companies.addItem,
          onPress: () => {
            //TODO: implement
          },
        }}
        error={companyContext.companiesError}
      />
    )
  }

  return (
    <View style={styles.flex1}>
      {renderHeader()}
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        data={companyContext.companies}
        renderItem={renderItem}
        ItemSeparatorComponent={itemSeparator}
        ListEmptyComponent={listEmptyComponent}
        refreshing={companyContext.isLoading}
        onRefresh={loadCompanies}
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
    searcRow: {
      flexDirection: 'row',
      paddingHorizontal: spaces.contentHorizontal,
      paddingVertical: spaces.small,
      backgroundColor: colors.white,
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
