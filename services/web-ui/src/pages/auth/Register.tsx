"use client"

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { registerThunk } from '@web-ui/store/thunks/auth/registerThunk';
import { AppDispatch } from '@web-ui/store/index';

import TextInput from '@web-ui/components/inputs/TextInput';
import { Button } from '@web-ui/components/Button';

export default function Page() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>();

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleRegister = async () => {
    dispatch(registerThunk({ username, email, password, rPassword: confirmPassword }))
  }

  return (
    <div className="pl-16 pt-16 bg-bg flex min-h-screen justify-start items-start gap-16 overflow-hidden">
      <div className="flex-1 self-stretch inline-flex flex-col justify-start items-center gap-2.5">
        <img src='/images/logo_full.svg' className='w-full' onClick={()=>{router.push('/');}}/>
      </div>
      <div className="flex-1 inline-flex flex-col justify-start items-center gap-16">
        <div className="w-[512px] flex flex-col justify-start items-start gap-24">
          <div className="self-stretch flex flex-col justify-start items-center gap-16">
            <div className="justify-start text-white text-7xl font-bold font-['Playfair_Display']">Register</div>
            <div className="self-stretch flex flex-col justify-start items-start gap-16">
              <div className="flex flex-col justify-start items-start gap-8 w-full">
                <TextInput label='Username' placeholder='Username' value={username} setValue={setUsername} />
                <TextInput label='Email' placeholder='Email' value={email} setValue={setEmail} />
                <TextInput label='Password' placeholder='Password' value={password} setValue={setPassword} password />
                <TextInput label='Repeat password' placeholder='Password' value={confirmPassword} setValue={setConfirmPassword} password />
              </div>
              <Button label='Sign In' onClick={handleRegister} className="w-full" />
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-start items-center gap-2">
            <div className="justify-start text-white/50 text-xl font-normal font-['Inter']">Already have an account?</div>
            <Button label='Login' onClick={() => {router.push('/login');}} className="w-full" type="outline" />
          </div>
        </div>
      </div>
    </div>
  )
}