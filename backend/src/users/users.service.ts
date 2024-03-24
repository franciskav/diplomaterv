import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import { UserDto } from './dto/user.dto';
import { UserResponseDto } from './dto/userResponse.dto';
import { Role } from './enums/role';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@Inject(User.name) private readonly userModel: Model<User>) {}

  async findOne(email: string): Promise<UserDto | undefined> {
    //TODO: find user
    const mockUser: UserDto = {
      userId: '1234',
      company: 'Test Company',
      firstName: 'John',
      lastName: 'Doe',
      email: email,
      password: 'Asdf1234.',
      role: Role.CompanyAdmin,
    };
    return mockUser;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
}
