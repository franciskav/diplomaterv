import React, {createContext, PropsWithChildren} from 'react'

interface SampleContextProps {}

export const SampleContext = createContext<SampleContextProps>({})

export const SampleProvider: React.FC<PropsWithChildren> = ({children}) => {
  return <SampleContext.Provider value={{}}>{children}</SampleContext.Provider>
}
