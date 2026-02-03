'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { AppDispatch } from '../store';
import { login } from '../store/slices/authSlice';

export function useAuth(routeAuthed: boolean = false) {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const token = useSelector((state: any) => state.auth.token);
    const emailConfirmed = useSelector((state: any) => state.client.emailConfirmed);
    const clientLoading = useSelector((state: any) => state.client.loading);

    const selectedProject = useSelector((state: any) => state.projectRepo.selectedProject);

    const cookiesToken = Cookies.get('token');
    const userId = Cookies.get('userId');

    const pathname = usePathname();

    useEffect(() => {
        // console.log('useAuth effect', {token, emailConfirmed, pathname, routeAuthed, selectedProject});

        if (token && !emailConfirmed && pathname !== '/confirm-email') router.push('/confirm-email');
        else if ((token || cookiesToken) && pathname?.includes('/accept-team-invitation')) return;
        else if (emailConfirmed && pathname === '/confirm-email') router.push('/select-project');
        else if (!token && cookiesToken) dispatch(login({ token: cookiesToken, userId }))
        else if (!token && !routeAuthed) router.push('/');
        else if (token && emailConfirmed && !selectedProject) {
            // TODO 
            router.push('/select-project')
        } else if (token && emailConfirmed && routeAuthed) router.push('/dashboard');

    }, [token, emailConfirmed])
}