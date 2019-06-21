import { Document } from 'mongoose';

export interface Messages extends Document {
  readonly id: Number;
  readonly user: string;
  readonly content: string;
  readonly date: Date;
}
