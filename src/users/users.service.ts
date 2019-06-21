import { Injectable, HttpException } from '@nestjs/common';
import { USERS } from '../mocks/users.mock';

@Injectable()
export class UsersService {
  users = USERS;

  getUsers(): Promise<any> {
    return new Promise(resolve => {
      resolve(this.users);
    });
  }

  addUser(user): Promise<any> {
    return new Promise(resolve => {
      this.users.forEach(onlineuser => {
        if (onlineuser === user) {
          throw new HttpException(
            'There is another online user with this username!',
            404,
          );
        }
      });
      this.users.push(user);
      resolve(this.users);
    });
  }
}
