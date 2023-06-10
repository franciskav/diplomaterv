import {useNavigation} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useContext, useEffect} from 'react'
import {Image, StyleSheet, View} from 'react-native'
import {Colors} from '../../constants/colors'
import {icons} from '../../constants/icons'
import {AuthContext, AuthStatus} from '../../context/authProvider'
import {useColors} from '../../hook/colorsHook'
import {RootStackProps} from '../../navigation/rootStack'
import asyncStorageService from '../../utility/services/asyncStorageService'

export const SplashScreen = () => {
  const colors = useColors()
  const styles = createStyles(colors)

  const authContext = useContext(AuthContext)

  const navigation = useNavigation<StackNavigationProp<RootStackProps>>()

  useEffect(() => {
    initStart()
  }, [])

  useEffect(() => {
    setTimeout(async () => {
      const token = await asyncStorageService.getAccessToken()
      if (authContext.authStatus === AuthStatus.LOGGED_IN && token) {
        navigation.replace('RootTab')
      } else if (authContext.authStatus === AuthStatus.LOGGED_OUT) {
        navigation.replace('AuthStack')
      }
    }, 2000)
  }, [authContext.authStatus])

  const initStart = async () => {
    authContext.checkAuthStatus(initStart)
  }

  return (
    <View style={styles.container}>
      <Image source={icons.logo_string} />
    </View>
  )
}

const createStyles = (colors: Colors) => {
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
  return styles
}
