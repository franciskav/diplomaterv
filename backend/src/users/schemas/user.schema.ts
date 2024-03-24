import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { isEmail } from 'class-validator';
import { HydratedDocument } from 'mongoose';
import { Role } from '../enums/role';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({
    required: true,
    unique: true,
    validate: (email: string) => {
      isEmail(email);
    },
  })
  email: string;

  @Prop({ required: true, minlength: 8, select: false })
  password: string;

  @Prop({ enum: Role, default: Role.CompanyAdmin })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
