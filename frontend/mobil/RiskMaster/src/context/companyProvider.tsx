import React, {createContext, PropsWithChildren, useState} from 'react'
import {Alert} from 'react-native'
import {strings} from '../constants/localization'
import {CompanyDetailsDto} from '../model/companyDetailsDto'
import {CompanyDto} from '../model/companyDto'
import {CreateCompanyDto} from '../model/createCompanyDto'
import companyApi from '../utility/api/companyApi'

interface CompanyContextProps {
  loadCompanies: () => void
  companies: CompanyDto[]
  companiesError?: string
  companiesSearcText?: string
  setCompaniesSearcText: (search?: string) => void
  companiesSort?: string
  setCompaniesSort: (sort?: string) => void
  createCompany: (createCompany: CreateCompanyDto, success?: () => void) => void
  updateCompany: (
    companyId: string,
    createCompany: CreateCompanyDto,
    success?: () => void,
  ) => void
  deleteCompany: (companyId: string) => void
  companyDetails?: CompanyDetailsDto
  loadCompanyDetails: (companyId: string, success?: () => void) => void
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
  companiesSort: undefined,
  setCompaniesSort: () => {
    throw new Error()
  },
  createCompany: () => {
    throw new Error()
  },
  updateCompany: () => {
    throw new Error()
  },
  deleteCompany: () => {
    throw new Error()
  },
  companyDetails: undefined,
  loadCompanyDetails: () => {
    throw new Error()
  },
  isLoading: false,
})

export const CompanyProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [companies, setCompanies] = useState<CompanyDto[]>([])
  const [companyDetails, setCompanyDetails] = useState<
    CompanyDetailsDto | undefined
  >()
  const [companiesError, setCompaniesError] = useState<string | undefined>()
  const [companiesSearcText, setCompaniesSearcText] = useState<
    string | undefined
  >()
  const [companiesSort, setCompaniesSort] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(false)

  const loadCompanies = async () => {
    setIsLoading(true)
    try {
      const response = await companyApi.getCompanies(
        companiesSearcText,
        companiesSort,
      )
      setCompanies(response)
      setCompaniesError(undefined)
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

  const updateCompany = async (
    companyId: string,
    createCompany: CreateCompanyDto,
    success?: () => void,
  ) => {
    setIsLoading(true)
    try {
      const response = await companyApi.updateCompany(companyId, createCompany)
      const index = companies.findIndex(company => company.id === companyId)
      companies[index] = {
        id: companyId,
        companyName: response.name,
        lastAssessment: response.lastAssessment,
      }
      setCompanies([...companies])
      setCompanyDetails(response)
      success?.()
    } catch (error) {
      Alert.alert(
        strings.common.errors.attention,
        strings.common.errors.saveError,
      )
    }
    setIsLoading(false)
  }

  const deleteCompany = async (companyId: string, success?: () => void) => {
    setIsLoading(true)
    try {
      await companyApi.deleteCompany(companyId)
      setCompanies(companies.filter(company => company.id !== companyId))
      success?.()
    } catch (error) {
      Alert.alert(
        strings.common.errors.attention,
        strings.common.errors.deleteError,
      )
    }
    setIsLoading(false)
  }

  const loadCompanyDetails = async (
    companyId: string,
    success?: () => void,
  ) => {
    setIsLoading(true)
    try {
      const response = await companyApi.getCompanyDetails(companyId)
      setCompanyDetails(response)
      setIsLoading(false)

      success?.()
    } catch (error) {
      setCompanyDetails(undefined)
      Alert.alert(
        strings.common.errors.attention,
        strings.common.errors.loadError,
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
        companiesSort,
        setCompaniesSort,
        createCompany,
        updateCompany,
        deleteCompany,
        companyDetails,
        loadCompanyDetails,
      }}>
      {children}
    </CompanyContext.Provider>
  )
}
