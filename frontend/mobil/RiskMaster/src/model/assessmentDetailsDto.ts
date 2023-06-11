import {RiskLevelsDto} from './riskLevelsDto'

export interface AssessmentDetailsDto {
  id: string
  name: string
  date: string
  locationType: string
  numberOfPositions: number
  riskLevels: RiskLevelsDto[]
  //positions: PositionDto[]
}
