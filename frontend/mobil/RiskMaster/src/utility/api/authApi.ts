import {LoginDto} from '../../model/loginDto'
import {SignUpDto} from '../../model/signUpDto'
import {TokenResponseDto} from '../../model/tokenResponseDto'
import Network from '../network'

class AuthApi {
  public login = async (loginDto: LoginDto): Promise<TokenResponseDto> => {
    const response = await Network.post('auth/login', loginDto)
    return response.data
  }

  public signUp = async (signUp: SignUpDto): Promise<void> => {
    await Network.post('auth/signUp', signUp)
  }
}

const authApi = new AuthApi()
export default authApi
