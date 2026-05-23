//frontend\modules\focus\services\attentionSocket.ts
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getAttentionSocket = () => {
  if (!socket) {
    socket = io(`${process.env.NEXT_PUBLIC_API_URL}/attention`, {
      autoConnect: false,

      transports: ['websocket'],

      reconnection: true,

      reconnectionAttempts: Infinity,

      reconnectionDelay: 1000,
    });

    console.log('Attention socket created');
  }

  return socket;
};
