//backend\src\attention\gateway\attention.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

import { AttentionService } from '../services/attention.service';

import { CreateAttentionEventDto } from '../dto/create-attention-event.dto';

@WebSocketGateway({
  namespace: '/attention',

  transports: ['websocket'],

  cors: {
    origin: ['http://localhost:3000', 'http://192.168.100.3:3000'],
  },
})
export class AttentionGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly attentionService: AttentionService) {}

  // =========================
  // CONNECT
  // =========================
  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  // =========================
  // DISCONNECT
  // =========================
  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  // =========================
  // EVENTS
  // =========================
  @SubscribeMessage('attention:event')
  async handleAttentionEvent(
    @MessageBody()
    payload: CreateAttentionEventDto,

    @ConnectedSocket()
    client: Socket,
  ) {
    try {
      console.log('Attention event from:', client.id);

      await this.attentionService.handleAttentionEvent(payload);

      return {
        ok: true,
      };
    } catch (error) {
      console.warn('Attention event rejected:', error.message);

      return {
        ok: false,
      };
    }
  }
}
