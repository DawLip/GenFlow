'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { AppDispatch } from '../store';
import { login } from '../store/slices/authSlice';

export function useAuth(routeAuthed:boolean=false, path:string|null=null) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  
  const token = useSelector((state:any) => state.auth.token);
  const emailConfirmed = useSelector((state:any) => state.client.emailConfirmed);
  const clientLoading = useSelector((state:any) => state.client.loading);

  const cookiesToken = Cookies.get('token');
  const userId = Cookies.get('userId');

  const pathname = usePathname();
  
  useEffect(()=>{
    const navigate = (path:any) => router.push(path);
    
    if(!token && cookiesToken) {
      dispatch(login({token: cookiesToken, userId}))
    } else {
      if(!token && !routeAuthed) navigate(path || '/');
      else if(token && routeAuthed) navigate(path || '/dashboard');
    }
  }, [token])

  useEffect(() => {
    if(((token || cookiesToken) && !emailConfirmed && !clientLoading && pathname !== '/confirm-email')) router.push('/confirm-email');
    if(emailConfirmed && pathname === '/confirm-email') router.push('/dashboard');
  }, [emailConfirmed]);
}