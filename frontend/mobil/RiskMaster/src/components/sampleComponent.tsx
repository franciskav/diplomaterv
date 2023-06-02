import {StyleSheet, View} from 'react-native'
import {Colors} from '../constants/colors'
import {useColors} from '../hook/colorsHook'

interface SampleComponentProps {}

export const SampleComponent = (props: SampleComponentProps) => {
  const colors = useColors()
  const styles = createStyles(colors)

  return <View></View>
}

const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({})

  return styles
}
