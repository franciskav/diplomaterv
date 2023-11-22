import {AssessmentDetailsDto} from '../../model/assessmentDetailsDto'
import {AssessmentDto} from '../../model/assessmentDto'
import {CreateAssessmentDto} from '../../model/createAssessmentDto'
import Network from '../network'

class AssessmentApi {
  public getAssessments = async (
    companyId: string,
    search?: string,
    sort?: string,
  ): Promise<AssessmentDto[]> => {
    const response = await Network.get(`/assessment/company/${companyId}`, {
      params: {search, sort},
    })
    return response.data.data
  }

  public createAssessment = async (
    companyId: string,
    createAssessment: CreateAssessmentDto,
  ): Promise<AssessmentDto> => {
    const response = await Network.post(
      `/assessment/company/${companyId}`,
      createAssessment,
    )
    return response.data.data
  }

  public updateAssessment = async (
    assessmentId: string,
    createAssessment: CreateAssessmentDto,
  ): Promise<AssessmentDetailsDto> => {
    const response = await Network.put(
      `/assessment/assessment/${assessmentId}`,
      createAssessment,
    )
    return response.data.data
  }

  public deleteAssessment = async (assessmentId: string): Promise<void> => {
    const response = await Network.delete(
      `/assessment/assessment/${assessmentId}`,
    )
    return response.data
  }

  public getAssessmentDetails = async (
    assessmentId: string,
  ): Promise<AssessmentDetailsDto> => {
    const response = await Network.get(`/assessment/assessment/${assessmentId}`)
    return response.data.data
  }
}

const assessmentApi = new AssessmentApi()
export default assessmentApi
