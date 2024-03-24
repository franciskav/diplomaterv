import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UsersService } from 'src/users/users.service';
import { LoginResponseDto } from './dto/loginResponse.dto';

type JwtPayload = {
  sub: string;
  email: string;
  role: string;
  iat: string;
  exp: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string): Promise<LoginResponseDto> {
    const user = await this.usersService.findOne(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.userId, email: user.email, role: user.role };
    return {
      assessToken: await this.jwtService.signAsync(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  async logout(jwtPayload: JwtPayload) {
    console.log('jwtPayload', jwtPayload);
  }
}
