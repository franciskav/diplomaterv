import {StyleSheet, Text, View} from 'react-native'
import {Colors} from '../constants/colors'
import {useColors} from '../hook/colorsHook'

interface SampleComponentProps {
  sample: string
}

export const SampleComponent = (props: SampleComponentProps) => {
  const colors = useColors()
  const styles = createStyles(colors)

  return (
    <View style={styles.container}>
      <Text>{props.sample}</Text>
    </View>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({
    container: {},
  })

  return styles
}
