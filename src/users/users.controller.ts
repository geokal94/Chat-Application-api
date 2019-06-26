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
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // add user
  @Post('/create')
  async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
    const user = await this.usersService.addUser(createUserDTO);
    return res.status(HttpStatus.OK).json({
      feedback: 'User has been created successfully',
      user,
    });
  }

  // Get users
  @Get('users')
  async getAllUsers(@Res() res) {
    const users = await this.usersService.getAllUsers();
    return res.status(HttpStatus.OK).json(users);
  }

  // Delete user
  @Delete('/delete')
  async deleteUser(@Res() res, @Query('userID') userID) {
    const user = await this.usersService.deleteUser(userID);
    if (!user) throw new NotFoundException('User does not exist');
    return res.status(HttpStatus.OK).json({
      feedback: 'Message has been deleted',
      user,
    });
  }
}
