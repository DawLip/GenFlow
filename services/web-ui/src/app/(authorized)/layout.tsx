'use client';

import React, { useEffect, useRef } from 'react';
import SimplePeer from 'simple-peer';

import { useAuth } from '@web-ui/hooks/useAuth';
import { socket, SocketContext } from '@web-ui/socket/socket';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@web-ui/store';
import { fetchClientThunk } from '@web-ui/store/thunks/client/fetchClientThunk';
import WebRTCProvider from '@web-ui/webrtc/webrtc.context';

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
    dispatch(fetchClientThunk());
  }, []);


  return (
    <div className='flex-col h-screen'>
      <SocketContext.Provider value={socket}>
        <WebRTCProvider>
          {children}
        </WebRTCProvider>
      </SocketContext.Provider>
    </div>
  )
}
