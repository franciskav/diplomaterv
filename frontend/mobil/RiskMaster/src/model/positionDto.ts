import {RisksDto} from './risksDto'

export interface PositionDto {
  id: string
  name: string
  employeeNumber: number
  risks: RisksDto
}
