import { Document } from 'mongoose';

export interface Users extends Document {
  readonly user: string;
}
