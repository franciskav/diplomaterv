import React from 'react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {BottomModalProvider} from '../components/bottomModal'
import {SampleProvider} from './sampleProvider'

interface AppProviderProps {
  children: React.ReactElement
}

const providers: React.ReactElement[] = [
  <BottomModalProvider key={1} />,
  <SafeAreaProvider key={2} />,
  <SampleProvider key={2} />,
]

export const AppProvider = ({children: initial}: AppProviderProps) =>
  providers.reduce(
    (children, parent) => React.cloneElement(parent, {children}),
    initial,
  )
