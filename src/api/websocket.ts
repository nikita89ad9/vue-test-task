import { WEBSOCKETS } from '@env/env.d.ts';
import { io, Socket } from 'socket.io-client';

let socketInstance: Socket | null = null;

const createSocket = (userId: string): Socket => {
  if (!socketInstance) {
    socketInstance = io(WEBSOCKETS, {
      query: {
        auth: userId,
      },
    });
  }

  return socketInstance;
};

const getSocketInstance = (): Socket | null => {
  return socketInstance;
};

const isSocketInstance = (value: Socket | null): value is Socket => {
  return value instanceof Socket;
};

const useSocket = <T>(callback: (socket: Socket) => T) => {
  const socket = getSocketInstance();

  if (isSocketInstance(socket)) {
    return callback(socket);
  } else {
    console.error('WebSockets is unavailable right now');
  }
};

export const wssService = {
  connect: (userId: string) => {
    createSocket(userId);
  },
  disconnect: () => {
    useSocket(socket => socket.disconnect());
    socketInstance = null;
  },
  emit: <T>(event: string, data: T) => {
    useSocket(socket => socket.emit(event, data));
  },
  on: <T>(event: string, callback: (data: T) => void) =>
    useSocket(socket => {
      socket.on(event, callback);
    }),
  once: <T>(event: string, callback: (data: T) => void) =>
    useSocket(socket => {
      socket.once(event, callback);
    }),
};
