import {LoginDto} from '../../model/loginDto'
import {SignUpDto} from '../../model/signUpDto'
import {TokenResponseDto} from '../../model/tokenResponseDto'
import Network from '../network'

class AuthApi {
  public login = async (loginDto: LoginDto): Promise<TokenResponseDto> => {
    const response = await Network.post('auth/login', loginDto)
    return response.data
  }

  public signUp = async (signUp: SignUpDto): Promise<TokenResponseDto> => {
    const response = await Network.post('auth/register', signUp)
    return response.data
  }

  public logout = async (): Promise<void> => {
    await Network.get('auth/logout')
  }
}

const authApi = new AuthApi()
export default authApi
