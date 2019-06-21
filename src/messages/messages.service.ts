import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Messages } from './interfaces/messages.inteface';
import { CreateMessageDTO } from './dto/create-message.dto';
import { MESSAGES } from '../mocks/messages.mock';

@Injectable()
export class MessagesService {
  messages = MESSAGES;

  getMessages(): Promise<any> {
    return new Promise(resolve => {
      resolve(this.messages);
    });
  }

  getMessage(messageID): Promise<any> {
    let id = Number(messageID);
    return new Promise(resolve => {
      const message = this.messages.find(message => message.id === id);
      if (!message) {
        throw new HttpException('Message does not exist!', 404);
      }
      resolve(message);
    });
  }

  addMessage(message): Promise<any> {
    return new Promise(resolve => {
      this.messages.push(message);
      resolve(this.messages);
    });
  }

  deleteMessage(messageID): Promise<any> {
    let id = Number(messageID);
    return new Promise(resolve => {
      let index = this.messages.findIndex(message => message.id === id);
      if (index === -1) {
        throw new HttpException('Message does not exist!', 404);
      }
      this.messages.splice(1, index);
      resolve(this.messages);
    });
  }
}
