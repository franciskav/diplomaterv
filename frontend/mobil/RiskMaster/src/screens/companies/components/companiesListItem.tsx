import {StyleSheet, Text, View} from 'react-native'
import {ListButton} from '../../../components/buttons/listButton'
import {Card} from '../../../components/cards/card'
import {Colors} from '../../../constants/colors'
import {icons} from '../../../constants/icons'
import {strings} from '../../../constants/localization'
import {margins} from '../../../constants/margins'
import {textStyle} from '../../../constants/styles'
import {useColors} from '../../../hook/colorsHook'
import {CompanyDto} from '../../../model/companyDto'
import {formatDate} from '../../../utility/helpers/formatHelper'

interface CompaniesListItemProps {
  item: CompanyDto
  onPress: () => void
  onEditPress: () => void
  onDeletePress: () => void
}

export const CompaniesListItem = (props: CompaniesListItemProps) => {
  const colors = useColors()
  const styles = createStyles(colors)

  return (
    <Card onPress={props.onPress} style={styles.card}>
      <View style={[styles.row, margins.mbNormal]}>
        <Text style={[textStyle.smallTitle, styles.flex1]}>
          {props.item.name}
        </Text>
        <ListButton
          small
          type={'secondary'}
          icon={icons.more}
          data={[
            {
              name: strings.common.actions.edit,
              icon: icons.edit,
              onPress: props.onEditPress,
            },
            {
              name: strings.common.actions.delete,
              icon: icons.delete,
              isAccent: true,
              onPress: props.onDeletePress,
            },
          ]}
          headerText={strings.common.actions.title}
        />
      </View>
      <Text style={textStyle.labelSecondary}>
        {`${strings.companies.lastAssessment}: `}
        <Text style={textStyle.body}>
          {props.item.lastAssessment
            ? formatDate(props.item.lastAssessment)
            : '-'}
        </Text>
      </Text>
    </Card>
  )
}

const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({
    card: {
      borderColor: colors.primary,
    },
    flex1: {
      flex: 1,
    },
    row: {
      flexDirection: 'row',
    },
  })
  return styles
}
