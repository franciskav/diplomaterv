import {CompanyDetailsDto} from '../../model/companyDetailsDto'
import {CompanyDto} from '../../model/companyDto'
import {CreateCompanyDto} from '../../model/createCompanyDto'
import Network from '../network'

class CompanyApi {
  public getCompanies = async (
    search?: string,
    sort?: string,
  ): Promise<CompanyDto[]> => {
    const response = await Network.get(`company/user/companies`, {
      params: {search, sort},
    })
    return response.data.data
  }

  public createCompany = async (
    createCompany: CreateCompanyDto,
  ): Promise<CompanyDto> => {
    const response = await Network.post('company/user/company', createCompany)
    return response.data.data
  }

  public updateCompany = async (
    companyId: string,
    createCompany: CreateCompanyDto,
  ): Promise<CompanyDetailsDto> => {
    const response = await Network.put(
      `company/user/company/${companyId}`,
      createCompany,
    )
    return response.data.data
  }

  public deleteCompany = async (companyId: string): Promise<void> => {
    const response = await Network.delete(`company/user/company/${companyId}`)
    return response.data
  }

  public getCompanyDetails = async (
    companyId: string,
  ): Promise<CompanyDetailsDto> => {
    const response = await Network.get(`company/user/company/${companyId}`)
    return response.data.data
  }
}

const companyApi = new CompanyApi()
export default companyApi
