import React, {createContext, PropsWithChildren, useState} from 'react'
import {Alert} from 'react-native'
import {strings} from '../constants/localization'
import {LoginDto} from '../model/loginDto'
import {SignUpDto} from '../model/signUpDto'
import authApi from '../utility/api/authApi'

interface AuthContextProps {
  login: (login: LoginDto) => void
  signUp: (signUp: SignUpDto, callback?: () => void) => void
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextProps>({
  login: () => {
    throw new Error()
  },
  signUp: () => {
    throw new Error()
  },
  isLoading: false,
})

export const AuthProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const login = async (login: LoginDto) => {
    //TODO: implement
    setIsLoading(true)
    try {
      const response = await authApi.login(login)
    } catch (error) {
      Alert.alert(
        strings.common.errors.attention,
        strings.common.errors.authError,
      )
    }
    setIsLoading(false)
  }

  const signUp = async (signUp: SignUpDto, callback?: () => void) => {
    //TODO: implement
    setIsLoading(true)
    try {
      await authApi.signUp(signUp)
      callback?.()
    } catch (error) {
      Alert.alert(
        strings.common.errors.attention,
        strings.common.errors.authError,
      )
    }
    setIsLoading(false)
  }

  return (
    <AuthContext.Provider value={{login, signUp, isLoading}}>
      {children}
    </AuthContext.Provider>
  )
}
