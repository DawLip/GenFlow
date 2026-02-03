import { createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';
import { services_config } from '@shared/services_config';

type SocketContextType = Socket | null;
export const SocketContext = createContext<SocketContextType>(null);

export const socket = io(services_config.service_url.gateway_web_ui, { 
  transports: ['websocket'],
  autoConnect: false,
});

export const useSocket = () => useContext(SocketContext);