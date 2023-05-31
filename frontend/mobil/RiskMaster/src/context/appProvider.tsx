import React from 'react'
import {SampleProvider} from './sampleProvider'

interface AppProviderProps {
  children: React.ReactElement
}

const providers: React.ReactElement[] = [<SampleProvider />]

export const AppProvider = ({children: initial}: AppProviderProps) =>
  providers.reduce(
    (children, parent) => React.cloneElement(parent, {children}),
    initial,
  )
