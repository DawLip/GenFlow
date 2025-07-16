import { ReactNode } from 'react';
import { SocketContext, socket } from '@web-ui/socket/socket';

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};