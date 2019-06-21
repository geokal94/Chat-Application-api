import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  Delete,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDTO } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get()
  async getMessages() {
    const messages = await this.messagesService.getMessages();
    return messages;
  }

  @Get(':messageID')
  async getBook(@Param('messageID') messageID) {
    const message = await this.messagesService.getMessage(messageID);
    return message;
  }

  @Post()
  async addMessage(@Body() createMessageDTO: CreateMessageDTO) {
    const message = await this.messagesService.addMessage(createMessageDTO);
    return message;
  }

  @Delete()
  async deleteMessage(@Query() query) {
    const messages = await this.messagesService.deleteMessage(query.messageID);
    return messages;
  }
}
