import AsyncStorage from '@react-native-async-storage/async-storage'
import {keys} from '../../constants/keys'

interface AuthInfo {
  accessToken: string
  refreshToken: string
}

class AsyncStorageService {
  public saveAuthInfo = async (authData: AuthInfo) => {
    await AsyncStorage.multiSet([
      [keys.ACCESS_TOKEN, authData.accessToken],
      [keys.REFRESH_TOKEN, authData.refreshToken],
    ])
  }

  public clearAuthinfo = async () => {
    await AsyncStorage.multiRemove([keys.ACCESS_TOKEN, keys.REFRESH_TOKEN])
  }

  public getAccessToken = async () => {
    const accessToken = await AsyncStorage.getItem(keys.ACCESS_TOKEN)
    if (!accessToken) {
      return undefined
    }
    return accessToken
  }

  public getRefreshToken = async () => {
    const refreshToken = await AsyncStorage.getItem(keys.REFRESH_TOKEN)
    if (!refreshToken) {
      return undefined
    }
    return refreshToken
  }
}

const asyncStorageService = new AsyncStorageService()
export default asyncStorageService
