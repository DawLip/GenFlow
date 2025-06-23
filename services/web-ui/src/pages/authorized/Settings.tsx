'use client'

import { Button } from "@web-ui/components/Button";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import { AppDispatch } from "@web-ui/store";
import { logout } from "@web-ui/store/slices/authSlice";

export default function Page() {
  const router = useRouter();
   const dispatch = useDispatch<AppDispatch>();
   
  const on_logout = () => {
    Cookies.remove('token');
    Cookies.remove('userId');

    dispatch(logout());

    router.push('/');
  }

  return (
    <div>
      Settings
      <Button label="logout" onClick={on_logout}/>
    </div>
  )
}