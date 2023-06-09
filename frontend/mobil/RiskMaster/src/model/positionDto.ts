import {RiskDto} from './riskDto'

export interface PositionDto {
  id: string
  name: string
  risks: RiskDto[]
}
