import {CompanyDto} from '../../model/companyDto'
import {CreateCompanyDto} from '../../model/createCompanyDto'
import Network from '../network'

class CompanyApi {
  public getCompanies = async (search?: string): Promise<CompanyDto[]> => {
    const searchQuery = search ? `?search=${search}` : ''
    const response = await Network.get(`company/user/companies${searchQuery}`)
    return response.data.data
  }

  public createCompany = async (
    createCompany: CreateCompanyDto,
  ): Promise<CompanyDto> => {
    const response = await Network.post(
      'company/user/create-company',
      createCompany,
    )
    return response.data
  }
}

const companyApi = new CompanyApi()
export default companyApi
