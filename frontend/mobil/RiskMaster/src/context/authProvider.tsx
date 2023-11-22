import React, {createContext, PropsWithChildren, useState} from 'react'
import {Alert} from 'react-native'
import {strings} from '../constants/localization'
import {LoginDto} from '../model/loginDto'
import {SignUpDto} from '../model/signUpDto'
import authApi from '../utility/api/authApi'
import asyncStorageService from '../utility/services/asyncStorageService'

export enum AuthStatus {
  NONE,
  LOGGED_IN,
  LOGGED_OUT,
}

interface AuthContextProps {
  login: (login: LoginDto) => void
  signUp: (signUp: SignUpDto, callback?: () => void) => void
  logout: (callback: () => void) => void
  checkAuthStatus: (onError: () => void) => void
  authStatus: AuthStatus
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextProps>({
  login: () => {
    throw new Error()
  },
  signUp: () => {
    throw new Error()
  },
  logout: () => {
    throw new Error()
  },
  checkAuthStatus: () => {
    throw new Error()
  },
  authStatus: AuthStatus.NONE,
  isLoading: false,
})

export const AuthProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.NONE)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const login = async (login: LoginDto) => {
    //TODO: implement
    setIsLoading(true)
    try {
      const response = await authApi.login(login)
      asyncStorageService.saveAuthInfo(response)
      setAuthStatus(AuthStatus.LOGGED_IN)
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
      const response = await authApi.signUp(signUp)
      asyncStorageService.saveAuthInfo(response)
      setAuthStatus(AuthStatus.LOGGED_IN)
      setIsLoading(false)
      callback?.()
    } catch (error) {
      Alert.alert(
        strings.common.errors.attention,
        strings.common.errors.authError,
      )
    }
    setIsLoading(false)
  }

  const logout = async (callback: () => void) => {
    setIsLoading(true)
    try {
      await authApi.logout()
    } catch (error) {
      console.log(error)
    }
    asyncStorageService.clearAuthInfo()
    setAuthStatus(AuthStatus.LOGGED_OUT)
    setIsLoading(false)
    callback()
  }

  const checkAuthStatus = async (onError: () => void) => {
    setIsLoading(true)
    const accessToken = await asyncStorageService.getAccessToken()
    if (!accessToken) {
      setAuthStatus(AuthStatus.LOGGED_OUT)
      asyncStorageService.clearAuthInfo()
    } else {
      setAuthStatus(AuthStatus.LOGGED_IN)
    }
    setIsLoading(false)
  }

  return (
    <AuthContext.Provider
      value={{login, signUp, logout, checkAuthStatus, authStatus, isLoading}}>
      {children}
    </AuthContext.Provider>
  )
}
