import {AddressDto} from './addressDto'
import {ContactDto} from './contactDto'

export interface CompanyDetailsDto {
  id: string
  name: string
  lastAssessment?: string
  address: AddressDto
  contact: ContactDto
  //assessments: AssessmentDto[]
}
