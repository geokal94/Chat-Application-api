import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

@WebSocketGateway()
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;
  num_of_onlineUsers: number = 0;
  onlineUsers: Array<object> = [];

  async handleConnection() {
    // A client has connected
    this.num_of_onlineUsers++;

    // Notify connected clients of current users
    this.server.emit('NUM_OF_USERS', this.num_of_onlineUsers);

    this.server.on('ADD_ONLINE_USER', function(data) {
      this.onlineUsers.push(data);
      this.server.emit('ONLINE_USERS', this.onlineUsers);
    });
  }

  async handleDisconnect() {
    // A client has disconnected
    this.num_of_onlineUsers--;

    // Notify connected clients of current users
    this.server.emit('NUM_OF_USERS', this.num_of_onlineUsers);
  }

  @SubscribeMessage('SEND_MESSAGE')
  async onChat(client, message) {
    client.broadcast.emit('MESSAGE', message); //sends to other users
    client.emit('MESSAGE', message); //also sends to himself
  }
}
