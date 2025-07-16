"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '@web-ui/store/thunks/auth/loginThunk';
import { AppDispatch } from '@web-ui/store/index';

import TextInput from '@web-ui/components/inputs/TextInput';
import { Header } from '@web-ui/components/Header';
import { Button } from '@web-ui/components/Button';

export default function Page() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    dispatch(loginThunk({ email, password }))
  }

  return (
    <div className="pl-16 pt-16 bg-bg min-h-screen flex justify-start items-start gap-16 overflow-hidden">
      <div className="flex-1 self-stretch flex flex-col justify-start items-center gap-2.5">
        <img src='/images/logo_full.svg' className='w-full' onClick={()=>{router.push('/');}}/>

      </div>
      <div className="flex-1 inline-flex flex-col justify-start items-center gap-16">
        <div className="w-[512px] flex flex-col justify-start items-start gap-24">
          <div className="self-stretch flex flex-col justify-start items-center gap-16">
            <div className="justify-start text-white text-7xl font-bold font-['Playfair_Display']">Login</div>
            <div className="self-stretch flex flex-col justify-start items-start gap-16">
              <div className="flex flex-col justify-start items-start gap-8 w-full">
                <TextInput label='Email' placeholder='Email' value={email} setValue={setEmail} />
                <TextInput label='Password' placeholder='Pasword' value={password} setValue={setPassword} password />
              </div>
              <Button label='Login' onClick={handleLogin} className="w-full" />
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-center gap-2">
            <div className="justify-start text-white/50 text-xl font-normal font-['Inter']">Don’t have an account?</div>
            <Button label='Sign In' onClick={() => {router.push('/register');}} className="w-full" type="outline" />
          </div>
        </div>
      </div>
    </div>
  )
}

