import { Mongoose } from 'mongoose';
import { databaseConstants } from 'src/database/constants';
import { User, UserSchema } from './schemas/user.schema';

export const usersProviders = [
  {
    provide: User.name,
    useFactory: (mongoose: Mongoose) => mongoose.model('User', UserSchema),
    inject: [databaseConstants.databaseConnection],
  },
];
