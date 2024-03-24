import * as mongoose from 'mongoose';
import { databaseConstants } from './constants';

export const databaseProviders = [
  {
    provide: databaseConstants.databaseConnection,
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect('mongodb://localhost/riskMaster'),
  },
];
