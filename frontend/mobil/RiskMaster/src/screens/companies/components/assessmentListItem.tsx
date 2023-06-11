import {StyleSheet, Text, View} from 'react-native'
import {ListButton} from '../../../components/buttons/listButton'
import {Card} from '../../../components/cards/card'
import {Colors} from '../../../constants/colors'
import {icons} from '../../../constants/icons'
import {strings} from '../../../constants/localization'
import {margins} from '../../../constants/margins'
import {textStyle} from '../../../constants/styles'
import {useColors} from '../../../hook/colorsHook'
import {AssessmentDto} from '../../../model/assessmentDto'
import {RiskLevelsDto} from '../../../model/riskLevelsDto'
import {formatDate} from '../../../utility/helpers/formatHelper'

interface AssessmentListItemProps {
  item: AssessmentDto
  onPress: () => void
  onEditPress: () => void
  onDeletePress: () => void
}

export const AssessmentListItem = (props: AssessmentListItemProps) => {
  const colors = useColors()
  const styles = createStyles(colors)

  const riskItem = (risk: RiskLevelsDto, index: number) => {
    return (
      <View style={styles.riskItem} key={index}>
        <Text style={textStyle.labelSecondary}>{risk.level}</Text>
        <Text style={[textStyle.small, margins.mtSmall]}>{`${
          risk.percent * 100
        }%`}</Text>
      </View>
    )
  }

  return (
    <Card onPress={props.onPress} style={styles.card}>
      <View style={[styles.row, margins.mbNormal]}>
        <Text style={[textStyle.smallTitle, styles.flex1]}>
          {`${props.item.name} - ${formatDate(props.item.date)}`}
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
      <Text style={[textStyle.labelSecondary, margins.mbNormal]}>
        {`${strings.companyDetails.numberOfPositions}: `}
        <Text style={textStyle.body}>{props.item.numberOfPositions ?? 0}</Text>
      </Text>
      {props.item.riskLevels && (
        <View>
          <Text style={[textStyle.labelSecondary, margins.mbNormal]}>
            {`${strings.companyDetails.riskLevels}: `}
          </Text>
          <View style={[styles.riskContainer]}>
            {props.item.riskLevels.map((riskLevel, index) =>
              riskItem(riskLevel, index),
            )}
          </View>
        </View>
      )}
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
    riskContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    riskItem: {
      alignItems: 'center',
    },
  })
  return styles
}
