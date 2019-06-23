import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Users } from '../users/interfaces/users.interface';

@WebSocketGateway()
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;
  num_of_onlineUsers: number = 0;
  connectedUsers: string[] = [];
  is_name_unique: boolean = false;

  async handleConnection() {
    // Notify connected clients of current users
    this.server.emit('NUM_OF_USERS', this.num_of_onlineUsers);
  }

  async handleDisconnect() {
    // Notify connected clients of current users
    this.server.emit('NUM_OF_USERS', this.num_of_onlineUsers);
  }

  @SubscribeMessage('SEND_MESSAGE')
  async onChat(client, message) {
    client.broadcast.emit('MESSAGE', message); //sends to other users
    client.emit('MESSAGE', message); //also sends to himself
  }

  @SubscribeMessage('ADD_ONLINE_USER')
  async onConnect(client, user) {
    // A client has connected
    this.num_of_onlineUsers++;
    this.server.emit('NUM_OF_USERS', this.num_of_onlineUsers);

    this.connectedUsers = [...this.connectedUsers, user];
    client.broadcast.emit('ONLINE_USERS', this.connectedUsers); //sends to other users
    client.emit('ONLINE_USERS', this.connectedUsers); //also sends to himself
  }

  /* Correct removing of online users happens only if 
    disconnection is perfomed with the disconnect button,not refresh or back button
    because username of user who disconnects cant be accessed to handleDisconnect() */
  @SubscribeMessage('REMOVE_ONLINE_USER')
  async onDisconnect(client, user) {
    const userPos = this.connectedUsers.indexOf(user);
    /* console.log('userPos: ', userPos);*/
    this.connectedUsers.splice(userPos, 1);
    // A client has disconnected
    this.num_of_onlineUsers--;
    this.server.emit('NUM_OF_USERS', this.num_of_onlineUsers);

    client.broadcast.emit('ONLINE_USERS', this.connectedUsers); //sends to other users
    client.emit('ONLINE_USERS', this.connectedUsers); //also sends to himself
  }

  @SubscribeMessage('CHECK_NAME')
  async checkName(client, data) {
    if (this.connectedUsers.find(name => name === data)) {
      /* console.log('User already logged in with this username!'); */
      this.is_name_unique = false;
      client.emit('ALLOW_IN', this.is_name_unique);
    } else {
      /* console.log('Success in logging in with unique username'); */
      this.is_name_unique = true;
      client.emit('ALLOW_IN', this.is_name_unique);
    }
  }
}
