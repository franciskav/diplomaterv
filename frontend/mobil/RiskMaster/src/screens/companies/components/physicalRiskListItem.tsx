import {Image, StyleSheet, Text, View} from 'react-native'
import {ListButton} from '../../../components/buttons/listButton'
import {Card} from '../../../components/cards/card'
import {Colors} from '../../../constants/colors'
import {icons} from '../../../constants/icons'
import {strings} from '../../../constants/localization'
import {margins} from '../../../constants/margins'
import {textStyle} from '../../../constants/styles'
import {useColors} from '../../../hook/colorsHook'
import {RiskItem} from '../../../model/risktItem'

interface PhysicalRiskListItemProps {
  item: RiskItem
  onPress: () => void
  onEditPress: () => void
  onDeletePress: () => void
}

export const PhysicalRiskListItem = (props: PhysicalRiskListItemProps) => {
  const colors = useColors()
  const styles = createStyles(colors)

  const getMarkerColor = (degree?: number) => {
    switch (degree) {
      case 0:
        return {backgroundColor: colors.rigkLevel['zero']}
      case 1:
        return {backgroundColor: colors.rigkLevel['one']}
      case 2:
        return {backgroundColor: colors.rigkLevel['two']}
      case 3:
        return {backgroundColor: colors.rigkLevel['three']}
      case 4:
        return {backgroundColor: colors.rigkLevel['four']}
      case 5:
        return {backgroundColor: colors.rigkLevel['five']}
      default:
        return {backgroundColor: colors.rigkLevel['zero']}
    }
  }

  const getLevelText = (degree?: number) => {
    switch (degree) {
      case 0:
        return '0'
      case 1:
        return 'I'
      case 2:
        return 'II'
      case 3:
        return 'III'
      case 4:
        return 'IV'
      case 5:
        return 'V'
      default:
        return '-'
    }
  }

  const riskItem = (
    isexisting: boolean,
    description: string,
    index: number,
  ) => {
    return (
      <View style={[styles.row, margins.mbSmall]} key={index}>
        <Image
          source={isexisting ? icons.checbox_tick : icons.checbox_outline}
          style={[
            margins.mrSmall,
            {
              tintColor: isexisting ? colors.primary : colors.divider,
              height: 20,
              width: 20,
            },
          ]}
        />
        <Text style={textStyle.small}>{description}</Text>
      </View>
    )
  }

  return (
    <Card onPress={props.onPress} style={styles.card}>
      <View style={[styles.row, margins.mbNormal]}>
        <Text style={[textStyle.smallTitle, styles.flex1]}>
          {props.item.riskType}
        </Text>
        <ListButton
          small
          type={'primary'}
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
        {props.item.protectiveMeasure.map((pm, index) =>
          riskItem(pm.isExisting, pm.description, index),
        )}
      </View>

      <View style={[styles.row, margins.mtNormal]}>
        <View
          style={[
            styles.marker,
            getMarkerColor(props.item.riskDegree),
            margins.mrNormal,
            margins.mlNormal,
          ]}
        />
        <View style={[margins.mtSmall, margins.mbSmall]}>
          <Text style={textStyle.labelSecondary}>
            {strings.physicalRisk.riskPoint}
            <Text style={textStyle.small}>{props.item.riskCount}</Text>
          </Text>
          <Text style={textStyle.labelSecondary}>
            {strings.physicalRisk.riskDegree}
            <Text style={textStyle.small}>
              {getLevelText(props.item.riskDegree)}
            </Text>
          </Text>
        </View>
      </View>

      <View style={margins.mtMedium}>
        <Text style={textStyle.mediumBold}>
          {strings.physicalRisk.proposedAction}
        </Text>
        {props.item.protectiveMeasure.map((mp, index) => (
          <View style={[margins.mlSmall, margins.mtSmall]} key={index}>
            {!mp.isExisting && (
              <Text style={textStyle.small}>{`• ${mp.proposedAction}`}</Text>
            )}
          </View>
        ))}
        {props.item.comment && (
          <Text style={[textStyle.small, margins.mlSmall]}>
            {props.item.comment}
          </Text>
        )}
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
      alignItems: 'center',
    },
    riskContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    marker: {
      height: '100%',
      width: 4,
      borderRadius: 2,
    },
  })
  return styles
}
