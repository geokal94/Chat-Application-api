import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Messages } from './interfaces/messages.inteface';
import { CreateMessageDTO } from './dto/create-message.dto';
/* import { MESSAGES } from '../mocks/messages.mock'; */

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('Messages') private readonly messagesModel: Model<Messages>,
  ) {}
  // fetch all messages
  async getAllMessages(): Promise<Messages[]> {
    const messages = await this.messagesModel.find().exec();
    return messages;
  }

  // post message
  async addMessage(createMessageDTO: CreateMessageDTO): Promise<Messages> {
    const newMessage = await this.messagesModel(createMessageDTO);
    return newMessage.save();
  }
  // Edit a message
  async updateMessage(
    messageID,
    createMessageDTO: CreateMessageDTO,
  ): Promise<Messages> {
    const updatedMessage = await this.messagesModel.findByIdAndUpdate(
      messageID,
      createMessageDTO,
      { new: true },
    );
    return updatedMessage;
  }
  // Delete message
  async deleteMessage(messageID): Promise<any> {
    const deletedMessage = await this.messagesModel.findByIdAndRemove(
      messageID,
    );
    return deletedMessage;
  }
}
