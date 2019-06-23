import * as mongoose from 'mongoose';

export const MessagesSchema = new mongoose.Schema({
  user: String,
  message: String,
  timestamp: String,
});
