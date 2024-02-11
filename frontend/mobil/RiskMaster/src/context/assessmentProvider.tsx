import React, {createContext, PropsWithChildren, useState} from 'react'
import {Alert} from 'react-native'
import {strings} from '../constants/localization'
import {AssessmentDetailsDto} from '../model/assessmentDetailsDto'
import {AssessmentDto} from '../model/assessmentDto'
import {CreateAssessmentDto} from '../model/createAssessmentDto'
import assessmentApi from '../utility/api/assessmentApi'

interface AssessmentContextProps {
  loadAssessments: (companyId: string) => void
  assessments: AssessmentDto[]
  assessmentsError?: string
  assessmentsSearcText?: string
  setAssessmentsSearcText: (search?: string) => void
  assessmentsSort?: string
  setAssessmentsSort: (sort?: string) => void
  createAssessment: (
    companyId: string,
    createAssessment: CreateAssessmentDto,
    success?: () => void,
  ) => void
  updateAssessment: (
    assessmentId: string,
    createAssessment: CreateAssessmentDto,
    success?: () => void,
  ) => void
  deleteAssessment: (assessmentId: string) => void
  assessmentDetails?: AssessmentDetailsDto
  loadAssessmentDetails: (assessmentId: string) => void
  isLoading: boolean
}

export const AssessmentContext = createContext<AssessmentContextProps>({
  loadAssessments: () => {
    throw new Error()
  },
  assessments: [],
  assessmentsError: undefined,
  assessmentsSearcText: undefined,
  setAssessmentsSearcText: () => {
    throw new Error()
  },
  assessmentsSort: undefined,
  setAssessmentsSort: () => {
    throw new Error()
  },
  createAssessment: () => {
    throw new Error()
  },
  updateAssessment: () => {
    throw new Error()
  },
  deleteAssessment: () => {
    throw new Error()
  },
  assessmentDetails: undefined,
  loadAssessmentDetails: () => {
    throw new Error()
  },
  isLoading: false,
})

export const AssessmentProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [assessments, setAssessments] = useState<AssessmentDto[]>([])
  const [assessmentDetails, setAssessmentDetails] = useState<
    AssessmentDetailsDto | undefined
  >()
  const [assessmentsError, setAssessmentsError] = useState<string | undefined>()
  const [assessmentsSearcText, setAssessmentsSearcText] = useState<
    string | undefined
  >()
  const [assessmentsSort, setAssessmentsSort] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(false)

  const loadAssessments = async (companyId: string) => {
    setIsLoading(true)
    try {
      const response = await assessmentApi.getAssessments(
        companyId,
        assessmentsSearcText,
        assessmentsSort,
      )
      setAssessments(response)
    } catch (error) {
      setAssessmentsError(strings.companyDetails.listError)
      setAssessments([])
    }
    setIsLoading(false)
  }

  const createAssessment = async (
    companyId: string,
    createAssessment: CreateAssessmentDto,
    success?: () => void,
  ) => {
    setIsLoading(true)
    try {
      const response = await assessmentApi.createAssessment(
        companyId,
        createAssessment,
      )
      setAssessments([response, ...assessments])
      success?.()
    } catch (error) {
      Alert.alert(
        strings.common.errors.attention,
        strings.common.errors.saveError,
      )
    }
    setIsLoading(false)
  }

  const updateAssessment = async (
    assessmentId: string,
    createAssessment: CreateAssessmentDto,
    success?: () => void,
  ) => {
    setIsLoading(true)
    try {
      const response = await assessmentApi.updateAssessment(
        assessmentId,
        createAssessment,
      )
      const index = assessments.findIndex(
        assessment => assessment.id === assessmentId,
      )
      assessments[index] = {
        id: assessmentId,
        name: response.name,
        date: response.date,
        locationType: response.locationType,
        numberOfPositions: response.numberOfPositions,
        riskLevels: response.riskLevels,
      }
      setAssessments([...assessments])
      setAssessmentDetails(response)
      success?.()
    } catch (error) {
      Alert.alert(
        strings.common.errors.attention,
        strings.common.errors.saveError,
      )
    }
    setIsLoading(false)
  }

  const deleteAssessment = async (
    assessmentId: string,
    success?: () => void,
  ) => {
    setIsLoading(true)
    try {
      await assessmentApi.deleteAssessment(assessmentId)
      setAssessments(
        assessments.filter(assessment => assessment.id !== assessmentId),
      )
      success?.()
    } catch (error) {
      Alert.alert(
        strings.common.errors.attention,
        strings.common.errors.deleteError,
      )
    }
    setIsLoading(false)
  }

  const loadAssessmentDetails = async (assessmentId: string) => {
    setIsLoading(true)
    try {
      const response = await assessmentApi.getAssessmentDetails(assessmentId)
      setAssessmentDetails(response)
    } catch (error) {
      setAssessmentDetails(undefined)
      Alert.alert(
        strings.common.errors.attention,
        strings.common.errors.loadError,
      )
    }
    setIsLoading(false)
  }

  return (
    <AssessmentContext.Provider
      value={{
        loadAssessments,
        assessments,
        assessmentsError,
        assessmentsSearcText,
        setAssessmentsSearcText,
        assessmentsSort,
        setAssessmentsSort,
        createAssessment,
        updateAssessment,
        deleteAssessment,
        assessmentDetails,
        loadAssessmentDetails,
        isLoading,
      }}>
      {children}
    </AssessmentContext.Provider>
  )
}
