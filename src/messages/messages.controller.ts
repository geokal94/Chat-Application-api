import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  Query,
  NotFoundException,
  Delete,
  Param,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDTO } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  // add message
  @Post('/create')
  async addMessage(@Res() res, @Body() createMessageDTO: CreateMessageDTO) {
    const message = await this.messagesService.addMessage(createMessageDTO);
    return res.status(HttpStatus.OK).json({
      feedback: 'Message has been created successfully',
      message,
    });
  }

  // Get messages
  @Get('messages')
  async getAllMessages(@Res() res) {
    const messages = await this.messagesService.getAllMessages();
    return res.status(HttpStatus.OK).json(messages);
  }

  // Edit message
  @Put('/update')
  async updateMessage(
    @Res() res,
    @Query('messageID') messageID,
    @Body() createMessageDTO: CreateMessageDTO,
  ) {
    const message = await this.messagesService.updateMessage(
      messageID,
      createMessageDTO,
    );
    if (!message) throw new NotFoundException('Message does not exist!');
    return res.status(HttpStatus.OK).json({
      feedback: 'Message has been successfully edited',
      message,
    });
  }

  // Delete message
  @Delete('/delete')
  async deleteMessage(@Res() res, @Query('messageID') messageID) {
    const message = await this.messagesService.deleteMessage(messageID);
    if (!message) throw new NotFoundException('Message does not exist');
    return res.status(HttpStatus.OK).json({
      feedback: 'Message has been deleted',
      message,
    });
  }
}
