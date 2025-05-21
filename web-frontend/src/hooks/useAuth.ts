'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { AppDispatch } from '../store';
import { login } from '../store/slices/authSlice';

export function useAuth(routeAuthed:boolean=false, path:string|null=null) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  
  let token = useSelector((state:any) => state.auth.token);

  const cookiesToken = Cookies.get('token');
  const userId = Cookies.get('userId');

  useEffect(()=>{
    const navigate = (path:any) => router.push(path);
    
    if(!token && cookiesToken) {
      dispatch(login({token: cookiesToken, userId}))
    } else {
      if(!token && !routeAuthed) navigate(path || '/');
      else if(token && routeAuthed) navigate(path || '/dashboard');
    }
  }, [token])
}