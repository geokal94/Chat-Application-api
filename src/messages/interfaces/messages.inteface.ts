import { Document } from 'mongoose';

export interface Messages extends Document {
  readonly user: string;
  readonly content: string;
  /*   readonly date: string; */
}
