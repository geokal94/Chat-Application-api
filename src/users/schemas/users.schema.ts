import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
  user: String,
});
