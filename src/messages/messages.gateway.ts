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

  async handleConnection() {}

  async handleDisconnect() {}

  @SubscribeMessage('SEND_MESSAGE')
  async onChat(client, message) {
    client.broadcast.emit('MESSAGE', message); //sends to other users
    client.emit('MESSAGE', message); //also sends to himself
  }
}
