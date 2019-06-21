import * as mongoose from 'mongoose';

export const MessagesSchema = new mongoose.Schema({
  id: Number,
  user: String,
  content: String,
  date: { type: Date, default: Date.now },
});
