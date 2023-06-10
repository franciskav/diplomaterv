import {PositionDto} from './positionDto'

export interface AssessmentDetailsDto {
  id: string
  name: string
  locationType: string
  positions: PositionDto[]
}
