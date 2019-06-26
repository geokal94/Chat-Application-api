import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './interfaces/users.interface';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<Users>,
  ) {}
  // fetch all users
  async getAllUsers(): Promise<Users[]> {
    const users = await this.usersModel.find().exec();
    return users;
  }

  // create user
  async addUser(createUserDTO: CreateUserDTO): Promise<Users> {
    const newUser = await this.usersModel(createUserDTO);
    return newUser.save();
  }

  // Delete user
  async deleteUser(userID): Promise<any> {
    const deletedUser = await this.usersModel.findByIdAndRemove(userID);
    return deletedUser;
  }
}
