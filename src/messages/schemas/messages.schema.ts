import * as mongoose from 'mongoose';

export const MessagesSchema = new mongoose.Schema({
  user: String,
  content: String,
  /* date: String, */
});
