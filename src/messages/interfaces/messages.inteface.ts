import { Document } from 'mongoose';

export interface Messages extends Document {
  readonly user: string;
  readonly message: string;
  readonly timestamp: string;
}
