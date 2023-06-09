import {StyleSheet, Text, View} from 'react-native'
import {ListButton} from '../../../components/buttons/listButton'
import {Card} from '../../../components/cards/card'
import {Colors} from '../../../constants/colors'
import {icons} from '../../../constants/icons'
import {strings} from '../../../constants/localization'
import {margins} from '../../../constants/margins'
import {textStyle} from '../../../constants/styles'
import {useColors} from '../../../hook/colorsHook'
import {PositionDto} from '../../../model/positionDto'
import {RiskDto} from '../../../model/riskDto'

interface PositionListItemProps {
  item: PositionDto
  onPress: () => void
  onEditPress: () => void
  onDeletePress: () => void
}

export const PositionListItem = (props: PositionListItemProps) => {
  const colors = useColors()
  const styles = createStyles(colors)

  const riskItem = (risk: RiskDto, index: number) => {
    return (
      <View style={[styles.riskItem, margins.mtSmall]} key={index}>
        <View
          style={[
            margins.mrSmall,
            {
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: !risk.degree ? colors.divider : '#85C7F2',
            },
          ]}
        />
        <Text style={textStyle.labelSecondary}>{risk.risk}</Text>
        <Text style={[textStyle.small]}>{risk.degree ? ` II` : ' -'}</Text>
      </View>
    )
  }

  return (
    <Card onPress={props.onPress} style={styles.card}>
      <View style={[styles.row, margins.mbSmall]}>
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
      <View>
        {props.item.risks.map((risk, index) => riskItem(risk, index))}
      </View>
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
    riskItem: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
  })
  return styles
}
