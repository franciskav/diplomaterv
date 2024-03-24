import { Role } from '../enums/role';

export class UserDto {
  userId: string;
  company: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}
