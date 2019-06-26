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
}
