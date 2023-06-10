import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useContext} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {BottomCard} from '../../components/cards/bottomCard'
import {Loader} from '../../components/loader'
import {Colors} from '../../constants/colors'
import {strings} from '../../constants/localization'
import {AuthContext} from '../../context/authProvider'
import {useColors} from '../../hook/colorsHook'
import {RootStackProps} from '../../navigation/rootStack'

export const ProfilenScreen = () => {
  const colors = useColors()
  const styles = createStyles(colors)

  const navigation = useNavigation<StackNavigationProp<RootStackProps>>()

  const authContext = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <View style={styles.flex1}>
        <Text>Profile</Text>
      </View>
      <BottomCard
        button1={{
          title: strings.profile.logout,
          onPress: () => {
            authContext.logout(() => {
              navigation.replace('AuthStack')
            })
          },
        }}
      />
      {authContext.isLoading && <Loader />}
    </View>
  )
}

const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({
    flex1: {
      flex: 1,
    },
    container: {
      flexGrow: 1,
      backgroundColor: colors.white,
    },
  })
  return styles
}
