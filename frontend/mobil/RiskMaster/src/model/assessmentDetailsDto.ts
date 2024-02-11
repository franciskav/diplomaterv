import {PositionDto} from './positionDto'

export interface AssessmentDetailsDto {
  id: string
  name: string
  date: string
  locationType: string
  //riskLevels: RiskLevelsDto[]
  positions: PositionDto[]
}
