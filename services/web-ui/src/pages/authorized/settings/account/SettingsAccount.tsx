'use client';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@web-ui/store';
import { SettingsMenu } from '@web-ui/components/settings/SettingsMenu';
import { Button } from '@web-ui/components/Button';
import Cookies from 'js-cookie';
import { logoutThunk } from '@web-ui/store/thunks/auth/logoutThunk';

export function SettingsAccount() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const on_logout = () => {
    Cookies.remove('token');
    Cookies.remove('userId');

    dispatch(logoutThunk());

    router.push('/');
  }

  return (
    <div>
      Account 
      <Button label="logout" onClick={on_logout}/>
    </div>
  );
}



