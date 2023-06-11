import {RiskLevelsDto} from './riskLevelsDto'

export interface AssessmentDto {
  id: string
  name: string
  date: string
  locationType: string //TODO: create enum
  numberOfPositions?: number
  riskLevels?: RiskLevelsDto[]
}
