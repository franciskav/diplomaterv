import {useNavigation} from '@react-navigation/native'
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
import {CompanyDto} from '../../model/companyDto'
import {RootStackProps} from '../../navigation/rootStack'
import {CompaniesListItem} from './components/companiesListItem'

const data: CompanyDto[] = [
  {
    id: '1',
    name: 'Company 1',
    lastAssessment: Date.now().toString(),
  },
  {
    id: '2',
    name: 'Company 2',
    lastAssessment: Date.now().toString(),
  },
  {
    id: '3',
    name: 'Company aminek hosszú a neve de nagyon',
    lastAssessment: Date.now().toString(),
  },
  {
    id: '4',
    name: 'Lorem ipsum',
  },
]

export const CompaniesScreen = () => {
  const colors = useColors()
  const styles = createStyles(colors)

  const navigation = useNavigation<StackNavigationProp<RootStackProps>>()

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
        data={data}
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
