import React, {createContext, PropsWithChildren, useState} from 'react'
import {Alert} from 'react-native'
import {strings} from '../constants/localization'
import {CompanyDto} from '../model/companyDto'
import {CreateCompanyDto} from '../model/createCompanyDto'
import companyApi from '../utility/api/companyApi'

interface CompanyContextProps {
  loadCompanies: () => void
  companies: CompanyDto[]
  companiesError?: string
  companiesSearcText?: string
  setCompaniesSearcText: (search?: string) => void
  createCompany: (createCompany: CreateCompanyDto, success?: () => void) => void
  isLoading: boolean
}

export const CompanyContext = createContext<CompanyContextProps>({
  loadCompanies: () => {
    throw new Error()
  },
  companies: [],
  companiesError: undefined,
  companiesSearcText: undefined,
  setCompaniesSearcText: () => {
    throw new Error()
  },
  createCompany: () => {
    throw new Error()
  },
  isLoading: false,
})

export const CompanyProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [companies, setCompanies] = useState<CompanyDto[]>([])
  const [companiesError, setCompaniesError] = useState<string | undefined>()
  const [companiesSearcText, setCompaniesSearcText] = useState<
    string | undefined
  >()
  const [isLoading, setIsLoading] = useState(false)

  const loadCompanies = async () => {
    setIsLoading(true)
    try {
      const response = await companyApi.getCompanies(companiesSearcText)
      console.log('response', response)
      setCompanies(response)
    } catch (error) {
      setCompanies([])
      setCompaniesError(strings.companies.listError)
    }
    setIsLoading(false)
  }

  const createCompany = async (
    createCompany: CreateCompanyDto,
    success?: () => void,
  ) => {
    setIsLoading(true)
    try {
      const response = await companyApi.createCompany(createCompany)
      setCompanies([response, ...companies])
      success?.()
    } catch (error) {
      Alert.alert(
        strings.common.errors.attention,
        strings.common.errors.saveError,
      )
    }
    setIsLoading(false)
  }

  return (
    <CompanyContext.Provider
      value={{
        isLoading,
        loadCompanies,
        companies,
        companiesError,
        companiesSearcText,
        setCompaniesSearcText,
        createCompany,
      }}>
      {children}
    </CompanyContext.Provider>
  )
}
