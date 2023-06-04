import React, {createContext, PropsWithChildren, useState} from 'react'

interface SampleContextProps {
  sampleProp: string
}

export const SampleContext = createContext<SampleContextProps>({
  sampleProp: '',
})

export const SampleProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [sampleProp] = useState('')
  return (
    <SampleContext.Provider value={{sampleProp}}>
      {children}
    </SampleContext.Provider>
  )
}
