'use client';

import React, { useEffect } from 'react';

import { TopBar } from '@web-ui/components/TopBar';
import { Nav } from '@web-ui/components/Nav';

import { useAuth } from '@web-ui/hooks/useAuth';
import { socket, SocketContext } from '@web-ui/socket/socket';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@web-ui/store';
import { fetchClientThunk } from '@web-ui/store/thunks/auth/fetchClientThunk';

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  
  useAuth();
  
  const token = useSelector((state: any) => state.auth.token);

  useEffect(()=>{
    socket.auth = { token: `Bearer ${token}` };
    socket?.connect();
    socket?.on('connect', () => {
      console.log('Socket connected');
    });
    socket?.on('disconnect', () => {
      console.log('Socket disconnected');
    });
    socket?.on('connect_error', (error:any) => {
      console.error('Socket connection error:', error);
    });
    return () => {
      socket?.off('connect');
      socket?.off('disconnect');
      socket?.off('connect_error');
      socket?.disconnect();
    }
  },[socket, token])

  useEffect(() => {
    dispatch(fetchClientThunk())
  }, []);


  return (
    <div className='flex-col h-screen'>
      <SocketContext.Provider value={socket}>
        <TopBar />
        <div className='grow'>
          <Nav />
          <main className='flex-1'>
            {children}
          </main>
        </div>
        <div className="self-stretch h-8 relative bg-black border-t-2 border-br"></div>
      </SocketContext.Provider>
    </div>
  )
}
