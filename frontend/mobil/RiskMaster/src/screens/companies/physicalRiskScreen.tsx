import {useState} from 'react'
import {Image, ListRenderItemInfo, StyleSheet, View} from 'react-native'
import {BottomCard} from '../../components/cards/bottomCard'
import {ListEmptyComponent} from '../../components/listEmptyComponent'
import {Tab} from '../../components/tab/tab'
import {Colors} from '../../constants/colors'
import {strings} from '../../constants/localization'
import {spaces} from '../../constants/spaces'
import {useColors} from '../../hook/colorsHook'
import {RiskItem} from '../../model/risktItem'
import {PhysicalRiskListItem} from './components/physicalRiskListItem'

const data: RiskItem[] = [
  {
    name: 'Targonca használata',
    riskCount: 20,
    riskDegree: 2,
    protectiveMeasure: [
      {
        isExisting: true,
        description: 'Üzembehelyezés előtti vizsgálat megtörtént',
        proposedAction: '',
      },
      {
        isExisting: true,
        description: 'A targonca időszakos felülvizsgálata megtörtént',
        proposedAction: '',
      },
      {
        isExisting: false,
        description: 'Időszakos biztonságtechnikai vizsgálat megtörtént',
        proposedAction: 'Időszakos biztonságtechnikai vizsgálat elkészítése ',
      },
      {
        isExisting: false,
        description: 'A vezető rendelkezik jogosítvánnyal',
        proposedAction: 'Jogosítvány megszerzése',
      },
    ],
  },
  {
    name: 'Szúró- vágóeszköz használata',
    riskCount: 5,
    riskDegree: 1,
    protectiveMeasure: [
      {
        isExisting: true,
        description: 'Körültekintő munkavégzés',
        proposedAction: '',
      },
    ],
    comment:
      'A veszély teljesen nem kerülhető el, körültekintő munkavégzés esetén is történhetnek balesetek',
  },
]

export interface PhysicalRiskScreenProps {
  riskId: string
}

export const PhysicalRiskScreen = () => {
  const colors = useColors()
  const styles = createStyles(colors)

  const [selectedTab, setSelectedTab] = useState(0)

  const renderItem = (row: ListRenderItemInfo<RiskItem>) => {
    return (
      <PhysicalRiskListItem
        item={row.item}
        onPress={() => {
          //TODO:
        }}
        onEditPress={() => {
          //TODO:
        }}
        onDeletePress={() => {
          //TODO:
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
        text={strings.physicalRisk.emptyList}
        button={{
          title: strings.physicalRisk.addItem,
          onPress: () => {
            //TODO: implement
          },
        }}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Tab
        style={styles.tab}
        buttons={[
          {
            title: strings.physicalRisk.risks,
            onPress: index => {
              setSelectedTab(index)
            },
          },
          {
            title: strings.physicalRisk.photos,
            onPress: index => {
              setSelectedTab(index)
            },
          },
        ]}
        selected={selectedTab}
      />
      {/* <FlatList
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={itemSeparator}
        ListEmptyComponent={listEmptyComponent}
        keyboardShouldPersistTaps={'handled'}
      /> */}
      <View
        style={{
          flex: 1,
          marginHorizontal: spaces.contentHorizontal,
          marginVertical: spaces.contentVertical,
        }}>
        <Image
          source={{
            uri: 'https://johazi.hu/wp-content/uploads/2020/04/munkavedelem-intro.jpg',
          }}
          style={{
            height: 200,
            borderColor: 'white',
            borderWidth: 3,
            borderRadius: 10,
          }}
        />
      </View>
      <BottomCard
        button1={{
          title: strings.physicalRisk.addItem,
          onPress: () => {
            //TODO: implement
          },
        }}
        safeArea
      />
    </View>
  )
}

const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({
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
    tab: {
      marginHorizontal: spaces.contentHorizontal,
      marginTop: spaces.medium,
    },
    separator: {
      height: spaces.big,
    },
  })
  return styles
}
