/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native'
import React, {useEffect, useRef} from 'react'
import {
  AppState,
  AppStateStatus,
  Appearance,
  Platform,
  UIManager,
} from 'react-native'
import DeviceInfo from 'react-native-device-info'

import {AppProvider} from './src/context/appProvider'
import {isReadyRef, navigationRef} from './src/navigation/navigation'
import {RootStack} from './src/navigation/rootStack'

function App(): JSX.Element {
  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    if (DeviceInfo.getApiLevelSync() > 30) {
      UIManager.setLayoutAnimationEnabledExperimental(false)
    } else {
      UIManager.setLayoutAnimationEnabledExperimental(true)
    }
  }

  React.useEffect(() => {
    return () => {
      isReadyRef.current = false
    }
  }, [])

  useEffect(() => {
    const appearanceListener = (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      preferences: Appearance.AppearancePreferences,
    ) => {
      /* */
    }
    const remove = Appearance.addChangeListener(appearanceListener)
    return () => {
      remove
    }
  }, [])

  const routeNameRef: React.MutableRefObject<string | null | undefined> | null =
    useRef(null)
  const appState = useRef(AppState.currentState)

  useEffect(() => {
    const appStateListener = (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        /* */
      }

      appState.current = nextAppState
    }
    const remove = AppState.addEventListener('change', appStateListener)

    return () => {
      remove
    }
  }, [])

  const onReady = () => {
    isReadyRef.current = true
    routeNameRef.current = navigationRef?.current?.getCurrentRoute?.()?.name
  }
  const onStateChange = () => {
    const previousRouteName = routeNameRef.current
    const currentRouteName = navigationRef?.current?.getCurrentRoute()?.name

    if (currentRouteName && previousRouteName !== currentRouteName) {
      /* */
    }

    routeNameRef.current = currentRouteName
  }

  return (
    <AppProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={onReady}
        onStateChange={onStateChange}>
        <RootStack />
      </NavigationContainer>
    </AppProvider>
  )
}

export default App
